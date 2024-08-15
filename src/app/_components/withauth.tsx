"use client";

import React, { useEffect,ComponentType } from 'react'
import {isAuthenticated} from "../utills"
import { redirect } from 'next/navigation';

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return function WithAuth(props: P) {
      const session = isAuthenticated();
      useEffect(() => {
        if (!session) {
          redirect("/signup");
        }
      }, [session]);
  
      if (!session) {
        return null;
      }
      return <WrappedComponent {...props} />;
    };
  };

  export default withAuth;