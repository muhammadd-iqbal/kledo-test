import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useEffect, useState } from "react";
import "./App.css";

// ── data ─────────────────────────────────────────────────────────────

const provinces = [
  {
    id: 1,
    name: "Kepulauan Riau",
  },
  {
    id: 2,
    name: "DKI Jakarta",
  },
  {
    id: 3,
    name: "Bali",
  },
];

const regencies = [
  {
    id: 1,
    name: "Kota Batam",
    province_id: 1,
  },
  {
    id: 2,
    name: "Kota Tanjung Pinang",
    province_id: 1,
  },
  {
    id: 3,
    name: "Jakarta Selatan",
    province_id: 2,
  },
  {
    id: 4,
    name: "Jakarta Barat",
    province_id: 2,
  },
  {
    id: 5,
    name: "Kota Denpasar",
    province_id: 3,
  },
  {
    id: 6,
    name: "Badung",
    province_id: 3,
  },
];

export const districts = [
  {
    id: 1,
    name: "Batam Kota",
    regency_id: 1,
  },
  {
    id: 2,
    name: "Batu Ampar",
    regency_id: 1,
  },
  {
    id: 3,
    name: "Belakang Padang",
    regency_id: 1,
  },
  {
    id: 4,
    name: "Bukit Bestari",
    regency_id: 2,
  },
  {
    id: 5,
    name: "Tanjung Pinang Barat",
    regency_id: 2,
  },
  {
    id: 6,
    name: "Tanjung Pinang Kota",
    regency_id: 2,
  },
  {
    id: 7,
    name: "Kebayoran Baru",
    regency_id: 3,
  },
  {
    id: 8,
    name: "Kebayoran Lama",
    regency_id: 3,
  },
  {
    id: 9,
    name: "Cilandak",
    regency_id: 3,
  },
  {
    id: 10,
    name: "Kebon Jeruk",
    regency_id: 4,
  },
  {
    id: 11,
    name: "Tamansari",
    regency_id: 4,
  },
  {
    id: 12,
    name: "Grogol Petamburan",
    regency_id: 4,
  },
  {
    id: 13,
    name: "Denpasar Selatan",
    regency_id: 5,
  },
  {
    id: 14,
    name: "Denpasar Barat",
    regency_id: 5,
  },
  {
    id: 15,
    name: "Denpasar Utara",
    regency_id: 5,
  },
  {
    id: 16,
    name: "Kuta",
    regency_id: 6,
  },
  {
    id: 17,
    name: "Kuta Selatan",
    regency_id: 6,
  },
  {
    id: 18,
    name: "Kuta Utara",
    regency_id: 6,
  },
];

interface Province {
  id: number;
  name: string;
}

interface Regency {
  id: number;
  name: string;
  province_id: number;
}

interface District {
  id: number;
  name: string;
  regency_id: number;
}

// ── Icons ─────────────────────────────────────────────────────────────
const GlobeIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 010 20M12 2a15.3 15.3 0 000 20" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4"
  >
    <path
      d="M17 22V16C17 14.1144 17 13.1716 16.4142 12.5858C15.8284 12 14.8856 12 13 12H11C9.11438 12 8.17157 12 7.58579 12.5858C7 13.1716 7 14.1144 7 16V22"
      stroke="#1C274C"
      stroke-width="1.5"
    />
    <path
      opacity="0.5"
      d="M21 21.9999V7.77195C21 6.4311 21 5.76068 20.6439 5.24676C20.2877 4.73283 19.66 4.49743 18.4045 4.02663C15.9492 3.10591 14.7216 2.64555 13.8608 3.2421C13 3.83864 13 5.14974 13 7.77195V11.9999"
      stroke="#1C274C"
      stroke-width="1.5"
    />
    <path
      opacity="0.5"
      d="M3.25 8C3.25 8.41421 3.58579 8.75 4 8.75C4.41421 8.75 4.75 8.41421 4.75 8H3.25ZM9.25 8C9.25 8.41421 9.58579 8.75 10 8.75C10.4142 8.75 10.75 8.41421 10.75 8H9.25ZM9.70711 4.79289L9.17678 5.32322L9.17678 5.32322L9.70711 4.79289ZM6.25 4C6.25 4.41421 6.58579 4.75 7 4.75C7.41421 4.75 7.75 4.41421 7.75 4H6.25ZM7.75 2C7.75 1.58579 7.41421 1.25 7 1.25C6.58579 1.25 6.25 1.58579 6.25 2H7.75ZM3.75 22V12H2.25V22H3.75ZM7 8.75C7.96401 8.75 8.61157 8.75159 9.09461 8.81654C9.55607 8.87858 9.75357 8.9858 9.88388 9.11612L10.9445 8.05546C10.4891 7.59999 9.92227 7.41432 9.29448 7.32991C8.68826 7.24841 7.92161 7.25 7 7.25V8.75ZM11.75 12C11.75 11.0784 11.7516 10.3117 11.6701 9.70552C11.5857 9.07773 11.4 8.51093 10.9445 8.05546L9.88388 9.11612C10.0142 9.24643 10.1214 9.44393 10.1835 9.90539C10.2484 10.3884 10.25 11.036 10.25 12H11.75ZM7 7.25C6.07839 7.25 5.31174 7.24841 4.70552 7.32991C4.07773 7.41432 3.51093 7.59999 3.05546 8.05546L4.11612 9.11612C4.24643 8.9858 4.44393 8.87858 4.90539 8.81654C5.38843 8.75159 6.03599 8.75 7 8.75V7.25ZM3.75 12C3.75 11.036 3.75159 10.3884 3.81654 9.90539C3.87858 9.44393 3.9858 9.24643 4.11612 9.11612L3.05546 8.05546C2.59999 8.51093 2.41432 9.07773 2.32991 9.70552C2.24841 10.3117 2.25 11.0784 2.25 12H3.75ZM4.75 8V6.5H3.25V8H4.75ZM6 5.25H8V3.75H6V5.25ZM9.25 6.5V8H10.75V6.5H9.25ZM8 5.25C8.49261 5.25 8.78661 5.25159 8.99734 5.27992C9.09389 5.29291 9.14226 5.3082 9.16404 5.31716C9.16908 5.31923 9.1724 5.32085 9.17433 5.32186C9.17624 5.32286 9.17708 5.32341 9.17717 5.32347C9.17723 5.32351 9.177 5.32335 9.17665 5.32307C9.1763 5.32279 9.17632 5.32277 9.17678 5.32322L10.2374 4.26256C9.92841 3.95354 9.55269 3.84109 9.19721 3.7933C8.8633 3.74841 8.4502 3.75 8 3.75V5.25ZM10.75 6.5C10.75 6.0498 10.7516 5.6367 10.7067 5.30279C10.6589 4.94731 10.5465 4.57159 10.2374 4.26256L9.17678 5.32322C9.17723 5.32368 9.17721 5.3237 9.17693 5.32335C9.17665 5.323 9.17649 5.32277 9.17653 5.32283C9.17659 5.32292 9.17714 5.32376 9.17814 5.32567C9.17915 5.3276 9.18077 5.33092 9.18284 5.33596C9.1918 5.35774 9.20709 5.40611 9.22008 5.50266C9.24841 5.71339 9.25 6.00739 9.25 6.5H10.75ZM4.75 6.5C4.75 6.00739 4.75159 5.71339 4.77992 5.50266C4.79291 5.40611 4.8082 5.35774 4.81716 5.33596C4.81923 5.33092 4.82085 5.3276 4.82186 5.32567C4.82286 5.32376 4.82341 5.32292 4.82347 5.32283C4.82351 5.32277 4.82335 5.323 4.82307 5.32335C4.82279 5.3237 4.82277 5.32368 4.82322 5.32322L3.76256 4.26256C3.45354 4.57159 3.34109 4.94731 3.2933 5.30279C3.24841 5.6367 3.25 6.0498 3.25 6.5H4.75ZM6 3.75C5.5498 3.75 5.1367 3.74841 4.80279 3.7933C4.44731 3.84109 4.07159 3.95354 3.76256 4.26256L4.82322 5.32322C4.82368 5.32277 4.8237 5.32279 4.82335 5.32307C4.823 5.32335 4.82277 5.32351 4.82283 5.32347C4.82292 5.32341 4.82376 5.32286 4.82567 5.32186C4.8276 5.32085 4.83092 5.31923 4.83596 5.31716C4.85774 5.3082 4.90611 5.29291 5.00266 5.27992C5.21339 5.25159 5.50739 5.25 6 5.25V3.75ZM7.75 4V2H6.25V4H7.75Z"
      fill="#1C274C"
    />
    <path
      d="M22 22L2 22"
      stroke="#1C274C"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      opacity="0.5"
      d="M10 15H14"
      stroke="#1C274C"
      stroke-width="1.5"
      stroke-linecap="round"
    />
    <path
      opacity="0.5"
      d="M10 18H14"
      stroke="#1C274C"
      stroke-width="1.5"
      stroke-linecap="round"
    />
  </svg>
);

const PinIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4"
  >
    <path d="M12 21c-4-4-7-7.5-7-11a7 7 0 1114 0c0 3.5-3 7-7 11z" />
    <circle cx="12" cy="10" r="2" />
  </svg>
);

const ResetIcon = () => (
  <svg
    strokeWidth="1.5"
    className="w-4 h-4"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M22.719 12A10.719 10.719 0 0 1 1.28 12h.838a9.916 9.916 0 1 0 1.373-5H8v1H2V2h1v4.2A10.71 10.71 0 0 1 22.719 12z" />
    <path fill="none" d="M0 0h24v24H0z" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-4 h-4"
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

const ArrowDownIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-5 h-5"
  >
    <path d="M12 5v14M5 12l7 7 7-7" />
  </svg>
);

const MenuIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    className="w-5 h-5"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ── Components ─────────────────────────────────────────────────────────────
interface RegionLevelProps {
  levelLabel: string;
  name: string;
  size: "xl" | "lg" | "md";
}

interface SelectOption {
  id: number;
  name: string;
}

interface SelectProps {
  label: string;
  icon: React.ReactNode;
  value: number | null;
  options: SelectOption[];
  onChange: (id: number | null) => void;
  placeholder: string;
  disabled?: boolean;
}

interface BreadcrumProps {
  data: string[];
}

interface SidebarContentProps {
  provinces: Province[];
  filteredRegencies: Regency[];
  filteredDistricts: District[];
  selectedProvinceId: number | null;
  selectedRegencyId: number | null;
  selectedDistrictId: number | null;
  onProvinceChange: (id: number | null) => void;
  onRegencyChange: (id: number | null) => void;
  onDistrictChange: (id: number | null) => void;
  onReset: () => void;
}

const Select: React.FC<SelectProps> = ({
  label,
  icon,
  value,
  options,
  onChange,
  placeholder,
  disabled = false,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    const val = e.target.value;
    onChange(val === "" ? null : Number(val));
  };

  return (
    <div className="mb-4">
      <p className="text-[10px] font-bold tracking-widest text-slate-400 mb-1.5 uppercase">
        {label}
      </p>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          {icon}
        </span>
        <select
          value={value ?? ""}
          onChange={handleChange}
          disabled={disabled}
          className="w-full appearance-none bg-white border border-slate-200 rounded-xl pl-9 pr-9 py-2.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400 cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">{placeholder}</option>
          {options.map((opt: SelectOption) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
          <ChevronIcon />
        </span>
      </div>
    </div>
  );
};

const sizeMap: Record<RegionLevelProps["size"], string> = {
  xl: "text-6xl",
  lg: "text-5xl",
  md: "text-4xl",
};

const RegionLevel: React.FC<RegionLevelProps> = ({
  levelLabel,
  name,
  size,
}) => (
  <div className="flex flex-col items-center">
    <p className="text-[11px] font-bold tracking-[0.2em] text-blue-400 uppercase mb-1">
      {levelLabel}
    </p>
    <h2
      className={`${sizeMap[size]} font-black text-slate-800 tracking-tight leading-none text-center`}
    >
      {name}
    </h2>
  </div>
);

const Breadcrumb: React.FC<BreadcrumProps> = ({ data }) => (
  <div className="flex items-center gap-1 flex-wrap">
    {data.map((seg: string, i: number) => (
      <span key={`${seg}-${i}`} className="flex items-center gap-1">
        {i > 0 && <span className="text-slate-300">›</span>}
        <span
          className={
            i === data.length - 1
              ? "font-semibold text-blue-600"
              : "text-slate-400"
          }
        >
          {seg}
        </span>
      </span>
    ))}
  </div>
);

const SidebarContent: React.FC<SidebarContentProps> = ({
  provinces,
  filteredRegencies,
  filteredDistricts,
  selectedProvinceId,
  selectedRegencyId,
  selectedDistrictId,
  onProvinceChange,
  onRegencyChange,
  onDistrictChange,
  onReset,
}) => (
  <>
    <div className="flex items-center gap-2 mb-8">
      <div className="w-8 h-8 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-500">
        <GlobeIcon />
      </div>
      <span className="text-sm font-bold text-slate-800 tracking-tight">
        Frontend Assessment
      </span>
    </div>

    <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-4">
      Filter Wilayah
    </p>

    <Select
      label="Provinsi"
      icon={<GlobeIcon />}
      value={selectedProvinceId}
      options={provinces}
      onChange={onProvinceChange}
      placeholder="Pilih Provinsi"
    />
    <Select
      label="Kota/Kabupaten"
      icon={<BuildingIcon />}
      value={selectedRegencyId}
      options={filteredRegencies}
      onChange={onRegencyChange}
      placeholder={
        selectedProvinceId ? "Pilih Kota/Kab" : "— Pilih Provinsi dulu —"
      }
      disabled={!selectedProvinceId}
    />
    <Select
      label="Kecamatan"
      icon={<PinIcon />}
      value={selectedDistrictId}
      options={filteredDistricts}
      onChange={onDistrictChange}
      placeholder={
        selectedRegencyId ? "Pilih Kecamatan" : "— Pilih Kota dulu —"
      }
      disabled={!selectedRegencyId}
    />

    <div className="mt-auto pt-4">
      <button
        onClick={onReset}
        className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-all"
      >
        <ResetIcon />
        Reset
      </button>
    </div>
  </>
);

// ── Cookie helpers ─────────────────────────────────────────────────────────

const COOKIE_KEY = "wilayah_filter";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30 days in seconds

interface FilterCookie {
  provinceId: number | null;
  regencyId: number | null;
  districtId: number | null;
}

function readFilterCookie(): FilterCookie {
  const fallback: FilterCookie = {
    provinceId: null,
    regencyId: null,
    districtId: null,
  };
  try {
    const match = document.cookie
      .split("; ")
      .find((row) => row.startsWith(`${COOKIE_KEY}=`));
    if (!match) return fallback;
    const raw = decodeURIComponent(match.split("=").slice(1).join("="));
    const parsed = JSON.parse(raw) as FilterCookie;
    return {
      provinceId:
        typeof parsed.provinceId === "number" ? parsed.provinceId : null,
      regencyId: typeof parsed.regencyId === "number" ? parsed.regencyId : null,
      districtId:
        typeof parsed.districtId === "number" ? parsed.districtId : null,
    };
  } catch {
    return fallback;
  }
}

function writeFilterCookie(value: FilterCookie): void {
  const encoded = encodeURIComponent(JSON.stringify(value));
  document.cookie = `${COOKIE_KEY}=${encoded}; max-age=${COOKIE_MAX_AGE}; path=/; SameSite=Lax`;
}

function clearFilterCookie(): void {
  document.cookie = `${COOKIE_KEY}=; max-age=0; path=/`;
}

export default function FilterPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const savedCookie = readFilterCookie();
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    savedCookie.provinceId
  );
  const [selectedRegencyId, setSelectedRegencyId] = useState<number | null>(
    savedCookie.regencyId
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    savedCookie.districtId
  );

  const filteredRegencies: Regency[] = regencies.filter(
    (r) => r.province_id === selectedProvinceId
  );
  const filteredDistricts: District[] = districts.filter(
    (d) => d.regency_id === selectedRegencyId
  );

  const selectedProvince =
    provinces.find((p) => p.id === selectedProvinceId) ?? null;
  const selectedRegency =
    regencies.find((r) => r.id === selectedRegencyId) ?? null;
  const selectedDistrict =
    districts.find((d) => d.id === selectedDistrictId) ?? null;

  const handleProvinceChange = (id: number | null): void => {
    setSelectedProvinceId(id);
    setSelectedRegencyId(null);
    setSelectedDistrictId(null);
  };

  const handleRegencyChange = (id: number | null): void => {
    setSelectedRegencyId(id);
    setSelectedDistrictId(null);
  };

  const handleReset = (): void => {
    setSelectedProvinceId(null);
    setSelectedRegencyId(null);
    setSelectedDistrictId(null);
    clearFilterCookie();
  };

  const breadcrumbs: string[] = [
    "Indonesia",
    ...(selectedProvince ? [selectedProvince.name] : []),
    ...(selectedRegency ? [selectedRegency.name] : []),
    ...(selectedDistrict ? [selectedDistrict.name] : []),
  ];

  const sidebarProps: SidebarContentProps = {
    provinces,
    filteredRegencies,
    filteredDistricts,
    selectedProvinceId,
    selectedRegencyId,
    selectedDistrictId,
    onProvinceChange: handleProvinceChange,
    onRegencyChange: handleRegencyChange,
    onDistrictChange: setSelectedDistrictId,
    onReset: handleReset,
  };

  useEffect(() => {
    const hasSelection =
      selectedProvinceId !== null ||
      selectedRegencyId !== null ||
      selectedDistrictId !== null;
    if (hasSelection) {
      writeFilterCookie({
        provinceId: selectedProvinceId,
        regencyId: selectedRegencyId,
        districtId: selectedDistrictId,
      });
    } else {
      clearFilterCookie();
    }
  }, [selectedProvinceId, selectedRegencyId, selectedDistrictId]);

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* ── Mobile backdrop ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={[
          "fixed top-0 left-0 h-full w-72 bg-white z-30",
          "flex flex-col p-5 shadow-xl",
          "transform transition-transform duration-300 ease-in-out",
          "md:hidden",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all"
          aria-label="Close sidebar"
        >
          <CloseIcon />
        </button>
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex w-60 bg-white border-r border-slate-100 flex-col p-5 shadow-sm shrink-0">
        <SidebarContent {...sidebarProps} />
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-auto min-w-0">
        {/* Top bar with breadcrumb */}
        <nav className="border-b border-slate-100 bg-white px-4 sm:px-8 py-3 flex items-center gap-3 text-sm shrink-0">
          {/* Hamburger — mobile only */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all shrink-0"
            aria-label="Open sidebar"
          >
            <MenuIcon />
          </button>
          <Breadcrumb data={breadcrumbs} />
        </nav>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          {!selectedProvince ? (
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-300 mx-auto">
                <GlobeIcon />
              </div>
              <p className="mt-3 text-slate-400 text-sm">
                Pilih provinsi untuk memulai
              </p>
            </div>
          ) : (
            <div className="flex flex-col items-center w-full max-w-lg px-4 sm:px-8">
              <RegionLevel
                levelLabel="Provinsi"
                name={selectedProvince.name}
                size="xl"
              />

              {selectedRegency && (
                <>
                  <div className="my-4 sm:my-5 text-slate-300">
                    <ArrowDownIcon />
                  </div>
                  <RegionLevel
                    levelLabel="Kota / Kabupaten"
                    name={selectedRegency.name}
                    size="lg"
                  />
                </>
              )}

              {selectedDistrict && (
                <>
                  <div className="my-4 sm:my-5 text-slate-300">
                    <ArrowDownIcon />
                  </div>
                  <RegionLevel
                    levelLabel="Kecamatan"
                    name={selectedDistrict.name}
                    size="md"
                  />
                </>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <FilterPage />,
  },
]);

const root = document.getElementById("root")!;

ReactDOM.createRoot(root).render(<RouterProvider router={router} />);
