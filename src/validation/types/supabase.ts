export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      "prompt nft": {
        Row: {
          conversation: number;
          created_at: string;
          creator: string;
          desc: string | null;
          id: string;
          image_url: string;
          length: number;
          level: number;
          nft_address: string | null;
          nft_id: number | null;
          prompt: Json;
          target: string;
          title: string;
        };
        Insert: {
          conversation?: number;
          created_at?: string;
          creator: string;
          desc?: string | null;
          id?: string;
          image_url: string;
          length?: number;
          level: number;
          nft_address?: string | null;
          nft_id?: number | null;
          prompt: Json;
          target: string;
          title: string;
        };
        Update: {
          conversation?: number;
          created_at?: string;
          creator?: string;
          desc?: string | null;
          id?: string;
          image_url?: string;
          length?: number;
          level?: number;
          nft_address?: string | null;
          nft_id?: number | null;
          prompt?: Json;
          target?: string;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "prompt nft_creator_fkey";
            columns: ["creator"];
            isOneToOne: false;
            referencedRelation: "user";
            referencedColumns: ["wallet_address"];
          },
        ];
      };
      user: {
        Row: {
          created_at: string;
          description: string | null;
          easy: number;
          email: string | null;
          extreme: number;
          hard: number;
          id: string;
          image_url: string | null;
          name: string | null;
          normal: number;
          score: number;
          wallet_address: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          easy?: number;
          email?: string | null;
          extreme?: number;
          hard?: number;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          normal?: number;
          score?: number;
          wallet_address: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          easy?: number;
          email?: string | null;
          extreme?: number;
          hard?: number;
          id?: string;
          image_url?: string | null;
          name?: string | null;
          normal?: number;
          score?: number;
          wallet_address?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      increment_difficulty: {
        Args: {
          address_arg: string;
          column_name: string;
        };
        Returns: undefined;
      };
      increment_score: {
        Args: {
          address_arg: string;
          score_increment: number;
        };
        Returns: undefined;
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never;
