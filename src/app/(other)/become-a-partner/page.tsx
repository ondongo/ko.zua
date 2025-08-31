import dynamic from "next/dynamic";
import React from "react";

const PartnerNoSSR = dynamic(() => import("./_components/Partner").then(mod => mod.Partner), {
  ssr: false,
});

function Page() {
  return <PartnerNoSSR />;
}

export default Page;
