// "use client";
// import {
//   GeoapifyGeocoderAutocomplete,
//   GeoapifyContext,
// } from "@geoapify/react-geocoder-autocomplete";
// import "@geoapify/geocoder-autocomplete/styles/round-borders-dark.css";
// import { useSearchStore } from "@/lib/store/store";
// export default function SearchContainer() {
//   const { search, setSearch } = useSearchStore();
//   return (
//     <div
//       className={`fixed top-0 left-0 h-screen w-full bg-gray-900/70 z-10 overflow-hidden
//     backdrop-blur-sm justify-centered opacity-0
//     ${search && "opacity-100"} 
//     `}
//       onClick={() => {
//         if (search) {
//           setSearch();
//         }
//       }}
//     >
//       <div
//         className="flex justify-center"
//         onClick={(e) => {
//           if (search) {
//             e.stopPropagation(); 
//           }
//         }}
//       >
//         <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEO_API_KEY}>
//           <div className=" sm:w-[45rem]">
//             <GeoapifyGeocoderAutocomplete
//               placeholder="Enter a location"
//               skipIcons
//             />
//           </div>
//         </GeoapifyContext>
//       </div>
//     </div>
//   );
// }
