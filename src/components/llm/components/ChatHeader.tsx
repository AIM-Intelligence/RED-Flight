const ChatHeader = ({ comment }: any) => {
  return (
    <div className="w-full flex gap-3 justify-between items-center text-white hover:text-red-500 transition-all ease-in-out">
      <div className="flex flex-col text-center">
        <p className="text-lg">{comment}</p>
      </div>
      <div className="flex flex-col text-center gap-2"></div>
    </div>
  );
};

export default ChatHeader;
