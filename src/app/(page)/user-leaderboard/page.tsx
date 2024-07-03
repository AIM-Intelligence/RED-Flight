"use client";

import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Image from "next/image";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MediaRenderer } from "thirdweb/react";
import { client } from "@/lib/client";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

type User = {
  id: string;
  image_url: string;
  name: string;
  address: string;
  score: number;
};

const USERS_PER_PAGE = 10;

const getRankImage = (score: number) => {
  if (score > 10000) return "/rank/gold.png";
  if (score > 5000) return "/rank/silver.png";
  return "/rank/bronze.png";
};

const Page = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { count } = await supabase.from("User").select("*", { count: "exact", head: true });
        setTotalPages(Math.ceil((count || 0) / USERS_PER_PAGE));
        const { data, error } = await supabase
          .from("User")
          .select("id, image_url, name, address, score")
          .order("score", { ascending: false })
          .range((currentPage - 1) * USERS_PER_PAGE, currentPage * USERS_PER_PAGE - 1);

        if (error) throw error;
        if (data) {
          setUsers(data);
        } else {
          setError("No data received from Supabase");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="z-10 container mx-auto p-4">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">🦋 RED Flights User Leaderboard 🏆</h1>
      </div>
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className="bg-black/50 p-4 rounded-lg">
          <Table className="border-collapse">
            <TableHeader>
              <TableRow className="border-b border-red-500">
                <TableHead className="w-[50px] text-red-500">Rank</TableHead>
                <TableHead className="w-[50px] text-red-500">Tier</TableHead>
                <TableHead className="w-[100px] text-red-500">Avatar</TableHead>
                <TableHead className="text-red-500">Name</TableHead>
                <TableHead className="text-red-500">Address</TableHead>
                <TableHead className="text-right text-red-500">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user, index) => (
                <TableRow key={user.id} className="border-b border-red-500">
                  <TableCell className="font-medium text-red-500">
                    {(currentPage - 1) * USERS_PER_PAGE + index + 1}
                  </TableCell>
                  <TableCell>
                    <Image src={getRankImage(user.score)} alt="Rank" width={30} height={30} />
                  </TableCell>
                  <TableCell className="p-1 flex items-center justify-center ">
                    <div className="w-[50px] h-[50px] rounded-full overflow-clip">
                      <MediaRenderer client={client} src={user.image_url} className=" max-h-[50px]" />
                    </div>
                  </TableCell>
                  <TableCell className="text-white">{user.name}</TableCell>
                  <TableCell className="text-white">{user.address}</TableCell>
                  <TableCell className="text-right text-white">{user.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="flex justify-center mt-4 space-x-2">
            <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              Previous
            </Button>
            <span className="py-2 text-white">
              Page {currentPage} of {totalPages}
            </span>
            <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
