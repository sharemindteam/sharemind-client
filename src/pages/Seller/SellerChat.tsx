import ChatBottomSection from 'components/Seller/SellerChat/ChatBottomSection';
import ChatHeader from 'components/Seller/SellerChat/ChatHeader';
import ChatListSection from 'components/Seller/SellerChat/ChatListSection';
import React from 'react';

function SellerChat() {
  return (
    <>
      <ChatHeader customerName='김고민'/>
      <ChatListSection />
      <ChatBottomSection />
    </>
  );
}

export default SellerChat;
