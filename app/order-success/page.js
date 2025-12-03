export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

import OrderSuccessClient from "./OrderSuccessClient";

export default function Page() {
  return <OrderSuccessClient />;
}


