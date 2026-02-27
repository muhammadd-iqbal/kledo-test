import { useState } from "react";
import "./App.css";
import {
  ArrowDownIcon,
  BuildingIcon,
  ChevronIcon,
  GlobeIcon,
  PinIcon,
  ResetIcon,
} from "./assets/icons";
import {
  districts,
  provinces,
  regencies,
  type District,
  type Regency,
} from "./assets/data";

interface RegionLevelProps {
  levelLabel: string;
  name: string;
  size: "xl" | "lg" | "md";
}

// ── Components ─────────────────────────────────────────────────────────────
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
  <nav className="border-b border-slate-100 bg-white px-8 py-3 flex items-center gap-1.5 text-sm shrink-0">
    {data.map((seg: string, i: number) => (
      <span key={`${seg}-${i}`} className="flex items-center gap-1.5">
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
  </nav>
);

export default function FilterPage() {
  const [selectedProvinceId, setSelectedProvinceId] = useState<number | null>(
    null
  );
  const [selectedRegencyId, setSelectedRegencyId] = useState<number | null>(
    null
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState<number | null>(
    null
  );

  // Derived data filtered by selection
  const filteredRegencies: Regency[] = regencies.filter(
    (r) => r.province_id === selectedProvinceId
  );
  const filteredDistricts: District[] = districts.filter(
    (d) => d.regency_id === selectedRegencyId
  );

  // Resolved names for display
  const selectedProvince =
    provinces.find((p) => p.id === selectedProvinceId) ?? null;
  const selectedRegency =
    regencies.find((r) => r.id === selectedRegencyId) ?? null;
  const selectedDistrict =
    districts.find((d) => d.id === selectedDistrictId) ?? null;

  // Handlers
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

  // Breadcrumb segments
  const breadcrumbs: string[] = [
    "Indonesia",
    ...(selectedProvince ? [selectedProvince.name] : []),
    ...(selectedRegency ? [selectedRegency.name] : []),
    ...(selectedDistrict ? [selectedDistrict.name] : []),
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* ── Sidebar ── */}
      <aside className="w-60 bg-white border-r border-slate-100 flex flex-col p-5 shadow-sm shrink-0">
        {/* Logo */}
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
          onChange={handleProvinceChange}
          placeholder="Pilih Provinsi"
        />

        <Select
          label="Kota/Kabupaten"
          icon={<BuildingIcon />}
          value={selectedRegencyId}
          options={filteredRegencies}
          onChange={handleRegencyChange}
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
          onChange={setSelectedDistrictId}
          placeholder={
            selectedRegencyId ? "Pilih Kecamatan" : "— Pilih Kota dulu —"
          }
          disabled={!selectedRegencyId}
        />

        <div className="mt-auto">
          <button
            onClick={handleReset}
            className="w-full flex items-center justify-center gap-2 border border-slate-200 rounded-xl py-2.5 text-sm font-semibold text-slate-500 hover:bg-slate-50 hover:text-slate-700 hover:border-slate-300 transition-all"
          >
            <ResetIcon />
            Reset
          </button>
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 flex flex-col overflow-auto">
        {/* Breadcrumb */}
        <nav className="border-b border-slate-100 bg-white px-8 py-3 flex items-center gap-1.5 text-sm shrink-0">
          <Breadcrumb data={breadcrumbs} />
        </nav>

        {/* Content */}
        <div className="flex-1 flex items-center justify-center">
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
            <div className="flex flex-col items-center w-full max-w-lg px-8">
              <RegionLevel
                levelLabel="Provinsi"
                name={selectedProvince.name}
                size="xl"
              />

              {selectedRegency && (
                <>
                  <div className="my-5 text-slate-300">
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
                  <div className="my-5 text-slate-300">
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
