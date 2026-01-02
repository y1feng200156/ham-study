import { ArrowLeftIcon, HouseIcon } from "@phosphor-icons/react";
import { Link, Outlet, useLocation } from "react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

export default function DemosLayout() {
  const location = useLocation();

  // Simple mapping for demo names, in a real app this might be dynamic or route handle based
  const demoNameMap: Record<string, string> = {
    "vertical-polarization": "垂直极化 (Vertical Polarization)",
    "horizontal-polarization": "水平极化 (Horizontal Polarization)",
    "circular-polarization": "圆极化 (Circular Polarization)",
    "elliptical-polarization": "椭圆极化 (Elliptical Polarization)",
    "yagi-antenna": "八木-宇田天线 (Yagi-Uda Antenna)",
    "inverted-v-antenna": "倒V天线 (Inverted V Antenna)",
    "gp-antenna": "GP天线 (Ground Plane Antenna)",
    "positive-v-antenna": "正V天线 (Positive V Antenna)",
    "quad-antenna": "方框天线 (Quad Antenna)",
    "moxon-antenna": "莫克森天线 (Moxon Antenna)",
    "quad-array-antenna": "四阵列天线 (Quad Array Antenna)",
  };

  const currentPath = location.pathname.split("/").pop() || "";
  const currentName = demoNameMap[currentPath] || "演示";

  return (
    <div className="container mx-auto py-6 px-4 md:px-6 space-y-6">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" asChild className="h-8 w-8">
            <Link to="/">
              <ArrowLeftIcon className="h-4 w-4" weight="bold" />
              <span className="sr-only">返回</span>
            </Link>
          </Button>
          
          <Separator orientation="vertical" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-2">
                    <HouseIcon className="h-4 w-4" weight="bold" />
                    首页
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{currentName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </div>
      
      <main>
        <Outlet />
      </main>
      
      {/* JSON-LD Structured Data for BreadcrumbList */}
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD structured data requires this
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "首页",
                item: "https://ham.charlesify.com/"
              },
              {
                "@type": "ListItem",
                position: 2,
                name: currentName,
                item: `https://ham.charlesify.com/demos/${currentPath}`
              }
            ]
          }),
        }}
      />
    </div>
  );
}
