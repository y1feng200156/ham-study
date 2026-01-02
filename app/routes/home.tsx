import { Link } from "react-router";
import CircularPolarizationScene from "../components/circular-polarization-scene";
import { ClientOnly } from "../components/client-only";
import EllipticalPolarizationScene from "../components/elliptical-polarization-scene";
import GPAntennaScene from "../components/gp-antenna-scene";
import HorizontalPolarizationScene from "../components/horizontal-polarization-scene";
import InvertedVAntennaScene from "../components/inverted-v-scene";
import MoxonAntennaScene from "../components/moxon-antenna-scene";
import PositiveVAntennaScene from "../components/positive-v-scene";
import QuadAntennaScene from "../components/quad-antenna-scene";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import VerticalPolarizationScene from "../components/vertical-polarization-scene";
import YagiAntennaScene from "../components/yagi-antenna-scene";

export default function Home() {
  return (
    <div className="container mx-auto py-10 px-4 md:px-6">
      <h1 className="text-3xl font-bold mb-6">业余无线电可视化</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>垂直极化 (Vertical Polarization)</CardTitle>
            <CardDescription>
              可视化垂直极化天线的电场传播 (Electric Field Propagation)。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
               <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <VerticalPolarizationScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/vertical-polarization">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>水平极化 (Horizontal Polarization)</CardTitle>
            <CardDescription>
               可视化水平极化天线的电场传播 (Electric Field Propagation)。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <HorizontalPolarizationScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/horizontal-polarization">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>圆极化 (Circular Polarization)</CardTitle>
            <CardDescription>
               可视化电场矢量旋转的圆极化传播 (Circular Polarization)。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <CircularPolarizationScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/circular-polarization">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>椭圆极化 (Elliptical Polarization)</CardTitle>
            <CardDescription>
               极化的一般形式，介于线极化和圆极化之间。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <EllipticalPolarizationScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/elliptical-polarization">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>八木-宇田天线 (Yagi-Uda Antenna)</CardTitle>
            <CardDescription>
               著名的定向天线，由引向器、有源振子和反射器组成。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <YagiAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/yagi-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>倒V天线 (Inverted V Antenna)</CardTitle>
            <CardDescription>
               架设简便的偶极子变种，中间高两端低。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <InvertedVAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/inverted-v-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>GP天线 (Ground Plane Antenna)</CardTitle>
            <CardDescription>
               垂直单极天线，带有水平或下倾的地网 (Radials)。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <GPAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/gp-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>正V天线 (Positive V Antenna)</CardTitle>
            <CardDescription>
               两臂向上翘起的偶极子，适合楼顶架设，更加安全紧凑。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <PositiveVAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/positive-v-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>方框天线 (Quad Antenna)</CardTitle>
            <CardDescription>
               方形回路构成的定向天线，具有高增益和低底噪的特点。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <QuadAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/quad-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>莫克森天线 (Moxon Antenna)</CardTitle>
            <CardDescription>
               矩形紧凑型定向天线，拥有卓越的前后比和宽带宽。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-slate-100 dark:bg-slate-800 h-[200px] rounded-md overflow-hidden flex items-center justify-center text-muted-foreground text-sm">
              <ClientOnly fallback={<div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse" />}>
                  <MoxonAntennaScene isThumbnail={true} />
               </ClientOnly>
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to="/demos/moxon-antenna">查看演示</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
