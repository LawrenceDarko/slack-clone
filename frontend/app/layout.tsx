import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GeneralContextProvider } from './context/GeneralContext'
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import LoginRedirect from './components/LoginRedirect';
import { headers } from "next/headers";
import { AuthContextProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Slack Clone',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  // const cookieStore = cookies()
  // const user = cookieStore.get('user')

  // const headersList = headers();
  // const activePath = headersList.get("/get-started/find");

  // if (activePath === '/get-started/find') {
  //   return;
  // }

  // if(!user){
  //   redirect('/get-started/find')
  // } 

  return (
    <AuthContextProvider>
      <GeneralContextProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </GeneralContextProvider>
    </AuthContextProvider>
  )
}

// function getSession() {
//   return fetch('http://localhost:8000/api/session').then(res => res.json());
// }
