import "./index.css";
import ReactDOM from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { useState } from "react";
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
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M9 9h6M9 12h6M9 15h6" />
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
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    className="w-4 h-4"
  >
    <path d="M3 12a9 9 0 109-9H3M3 3v6h6" />
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

export default function FilterPage() {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const [selectedRegencyId, setSelectedRegencyId] = useState<number | null>(
    null
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
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
