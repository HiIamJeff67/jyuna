import { cookies } from "next/headers";
import styles from "./layout.module.css";
import WelcomePage from "@/pages/WelcomePage/WelcomePage";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // check if users have refresh tokens or not,
  // if they do, then fetch users' data, store them somewhere
  // else redirect them to the welcome page(the introduction page of tha app)

  // const cookieStore = await cookies();
  // const refreshToken = cookieStore.get("refreshToken");
  // console.log("refreshToken: ", refreshToken);

  const isAuthenticated = false;

  return (
    <html lang="en" className={styles.html}>
      <body className={styles.body}>
        {isAuthenticated ? (
          <body className={``}>{children}</body>
        ) : (
          <WelcomePage />
        )}
      </body>
    </html>
  );
}
