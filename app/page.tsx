'use client';

import React, { useEffect } from "react";
import App from "../App";

export default function HomePage() {
  useEffect(() => {
    console.log('🚀 The Cosmic Weaver - App loaded successfully!');
    console.log('📍 Current URL:', window.location.href);
  }, []);

  return <App />;
}

