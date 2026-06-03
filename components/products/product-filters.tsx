"use client";

import { RotateCcw } from "lucide-react";
import { ProductCondition } from "@/lib/types";

// Supported categories array
const FILTER_CATEGORIES = ["Fashion", "Sneakers", "Electronics", "Home"];

// Available secondhand conditions lists
const CONDITION_OPTIONS: { value: ProductCondition; label: string }[] = [
  { value: "NEW_WITH_TAGS", label: "Brand New" },
  { value: "LIKE_NEW", label: "Like New" },
  { value: "GENTLY_USED", label: "Gently Used" },
  { value: "FAIR", label: "Fair" },
];

export interface FilterState {
  search: string;
  category: string;
  priceMin: string;
  priceMax: string;
  conditions: ProductCondition[];
  sortBy: string;
}

interface ProductFiltersProps {
  filters: FilterState;
  onChange: (newFilters: FilterState) => void;
  onClear: () => void;
}

export default function ProductFilters({ filters, onChange, onClear }: ProductFiltersProps) {
  
  // Handler for text search inputs
  const handleSearchChange = (val: string) => {
    onChange({ ...filters, search: val });
  };

  // Handler for category select click
  const handleCategorySelect = (catName: string) => {
    // If clicking already active category, unselect it (toggle behaviour)
    const nextCategory = filters.category === catName ? "All" : catName;
    onChange({ ...filters, category: nextCategory });
  };

  // Handler for condition checkboxes
  const handleConditionToggle = (condition: ProductCondition) => {
    const isChecked = filters.conditions.includes(condition);
    const nextConditions = isChecked
      ? filters.conditions.filter((c) => c !== condition)
      : [...filters.conditions, condition];
    onChange({ ...filters, conditions: nextConditions });
  };

  // Handler for min/max price range changes
  const handlePriceChange = (field: "priceMin" | "priceMax", val: string) => {
    // Allow digits only
    const cleanVal = val.replace(/\D/g, "");
    onChange({ ...filters, [field]: cleanVal });
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Search Input Section */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          Search Items
        </label>
        <input
          type="text"
          placeholder="Type keywords..."
          value={filters.search}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="w-full h-10 px-3.5 text-xs font-semibold rounded-lg border border-zinc-200 outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400 transition-all bg-white"
        />
      </div>

      {/* Categories Buttons List */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
          Product Category
        </label>
        <div className="flex flex-col gap-1.5">
          <button
            onClick={() => onChange({ ...filters, category: "All" })}
            className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-all border ${
              filters.category === "All"
                ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                : "bg-white text-zinc-600 border-zinc-150 hover:bg-zinc-50"
            }`}
          >
            <span>All Categories</span>
          </button>
          
          {FILTER_CATEGORIES.map((catName) => {
            const isActive = filters.category === catName;
            return (
              <button
                key={catName}
                onClick={() => handleCategorySelect(catName)}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-bold rounded-lg transition-all border ${
                  isActive
                    ? "bg-zinc-900 text-white border-zinc-900 shadow-2xs"
                    : "bg-white text-zinc-600 border-zinc-150 hover:bg-zinc-50"
                }`}
              >
                <span>{catName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Secondhand Condition Selection */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2.5">
          Item Condition
        </label>
        <div className="flex flex-col gap-2">
          {CONDITION_OPTIONS.map((opt) => {
            const isChecked = filters.conditions.includes(opt.value);
            return (
              <label
                key={opt.value}
                className="flex items-center gap-2.5 text-xs font-semibold text-zinc-700 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => handleConditionToggle(opt.value)}
                  className="w-4 h-4 rounded-md border-zinc-300 text-zinc-950 focus:ring-zinc-950"
                />
                <span>{opt.label}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Pricing Range Filters */}
      <div>
        <label className="block text-xs font-bold text-zinc-400 uppercase tracking-wider mb-2">
          Price Range (₦)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Min"
            value={filters.priceMin}
            onChange={(e) => handlePriceChange("priceMin", e.target.value)}
            className="w-full h-10 px-3 text-xs font-semibold rounded-lg border border-zinc-200 outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400 bg-white"
          />
          <span className="text-zinc-400 text-xs">-</span>
          <input
            type="text"
            placeholder="Max"
            value={filters.priceMax}
            onChange={(e) => handlePriceChange("priceMax", e.target.value)}
            className="w-full h-10 px-3 text-xs font-semibold rounded-lg border border-zinc-200 outline-hidden focus:ring-1 focus:ring-zinc-950 focus:border-zinc-950 placeholder-zinc-400 bg-white"
          />
        </div>
      </div>

      {/* Action Buttons: Reset/Clear Filters */}
      <div className="pt-4 border-t border-zinc-100 flex gap-2">
        <button
          onClick={onClear}
          className="w-full h-10 rounded-lg flex items-center justify-center gap-1.5 border border-zinc-200 bg-zinc-50 hover:bg-zinc-100 text-zinc-700 text-xs font-bold transition-all"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset Filters
        </button>
      </div>

    </div>
  );
}
