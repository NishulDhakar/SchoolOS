import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
      <polygon
        points="12 3 2 8 12 13 22 8 12 3"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path d="M5 10v4c0 2.5 3.9 4 7 4s7-1.5 7-4v-4" strokeWidth="1.8" />
      <path d="M19 10v6" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19" cy="17.5" r="0.9" fill="currentColor" />
    </svg>
    );
}

// import { SVGAttributes } from "react";

// /** Graduation cap (mortarboard) */
// export function GraduationCapIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <polygon
//         points="12 3 2 8 12 13 22 8 12 3"
//         strokeWidth="1.8"
//         strokeLinejoin="round"
//       />
//       <path d="M5 10v4c0 2.5 3.9 4 7 4s7-1.5 7-4v-4" strokeWidth="1.8" />
//       <path d="M19 10v6" strokeWidth="1.8" strokeLinecap="round" />
//       <circle cx="19" cy="17.5" r="0.9" fill="currentColor" />
//     </svg>
//   );
// }

// /** Open book */
// export function OpenBookIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path
//         d="M3 6.5c3-1.8 6-1.8 9 0v12c-3-1.8-6-1.8-9 0V6.5Z"
//         strokeWidth="1.8"
//         strokeLinejoin="round"
//       />
//       <path
//         d="M12 6.5c3-1.8 6-1.8 9 0v12c-3-1.8-6-1.8-9 0V6.5Z"
//         strokeWidth="1.8"
//         strokeLinejoin="round"
//       />
//       <path d="M7 9.5h3M7 12h3M7 14.5h3" strokeWidth="1.5" />
//     </svg>
//   );
// }

// /** School building */
// export function SchoolBuildingIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path d="M3 20h18" strokeWidth="1.8" strokeLinecap="round" />
//       <path
//         d="M5 20v-7l7-4 7 4v7"
//         strokeWidth="1.8"
//         strokeLinejoin="round"
//       />
//       <path d="M12 9V5l2.5-1.5" strokeWidth="1.5" strokeLinecap="round" />
//       <rect x="10" y="13" width="4" height="7" rx="0.8" strokeWidth="1.5" />
//       <path d="M6.5 13h2v2h-2zM15.5 13h2v2h-2z" fill="currentColor" />
//     </svg>
//   );
// }

// /** Pencil */
// export function PencilIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <path
//         d="M3 21l3.5-.7L19 7.8a2.5 2.5 0 0 0-3.5-3.5L3 16.8 3 21Z"
//         strokeWidth="1.8"
//         strokeLinejoin="round"
//       />
//       <path d="M14.5 4.3l5.2 5.2" strokeWidth="1.5" />
//       <path d="M3 21l3.5-.7" strokeWidth="1.5" strokeLinecap="round" />
//     </svg>
//   );
// }

// /** Backpack */
// export function BackpackIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <rect
//         x="4"
//         y="7"
//         width="16"
//         height="13"
//         rx="3"
//         strokeWidth="1.8"
//       />
//       <path d="M8 7a4 4 0 0 1 8 0" strokeWidth="1.8" />
//       <rect x="7" y="13" width="10" height="4" rx="1" strokeWidth="1.5" />
//       <path d="M6 11h12" strokeWidth="1.5" />
//     </svg>
//   );
// }

// /** Ruler */
// export function RulerIcon(props: SVGAttributes<SVGElement>) {
//   return (
//     <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
//       <rect x="3" y="6" width="18" height="12" rx="2" strokeWidth="1.8" />
//       <path d="M7 8v4M10 8v2M13 8v4M16 8v2M19 8v4" strokeWidth="1.4" />
//     </svg>
//   );
// }
