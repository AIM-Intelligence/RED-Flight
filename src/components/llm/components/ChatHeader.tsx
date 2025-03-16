const ChatHeader = ({ comment }: any) => {
  return (
    <div className="flex w-full items-center justify-between gap-3 text-white transition-all ease-in-out hover:text-red-500">
      <div className="flex flex-col text-center">
        <p className="text-lg">{comment}</p>
      </div>
      <div className="flex flex-col gap-2 text-center"></div>
    </div>
  );
};

export default ChatHeader;
