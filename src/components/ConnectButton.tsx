'use client';

export const ConnectButton = () => {
  return (
    <button 
      onClick={() => alert('Coming Soon: Wallet Connection')}
      className="px-6 py-2.5 bg-yellow-500 hover:bg-yellow-400 text-black font-black text-xs md:text-sm rounded-xl transition-all active:scale-95 shadow-[0_0_20px_rgba(234,179,8,0.3)] uppercase italic"
    >
      Connect Wallet
    </button>
  );
};