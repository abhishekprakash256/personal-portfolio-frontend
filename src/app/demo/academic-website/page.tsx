'use client';

import 'bootstrap/dist/css/bootstrap.min.css';


import { useEffect } from 'react';
import { useRouter } from 'next/navigation';





const RedirectToStatic = () => {
  const router = useRouter();

  useEffect(() => {
    // Redirect to an external or internal URL
    window.location.href = 'http://localhost:5100'; // or /demo/academic-website/index.html
  }, []);

  return <p>Redirecting...</p>;
};

export default RedirectToStatic;