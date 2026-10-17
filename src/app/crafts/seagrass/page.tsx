import SeagrassPageView, { seagrassMetadata } from "./SeagrassPageView";

export const metadata = seagrassMetadata("ar");

export default function SeagrassPage() {
  return <SeagrassPageView locale="ar" />;
}
