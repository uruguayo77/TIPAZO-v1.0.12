import { c as createContextScope, u as useComposedRefs, j as jsxRuntimeExports, P as Primitive, a as composeEventHandlers, b as Presence, d as usePrevious, e as useSize, f as createRovingFocusGroupScope, g as useDirection, h as useControllableState, R as Root, I as Item, i as cn, k as useLanguage, l as useAuth, m as mapboxgl, t as toast, C as Card, n as CardHeader, o as CardTitle, p as CardContent, B as Button, q as Info, r as Clock, S as SemipolarSpinner, M as MapPin, O as OptimizedInput, s as OptimizedTextarea, v as Badge, E as Eye, w as PhotoGallery, G as Geolocation, x as supabase, y as INCIDENT_DURATION_LIMITS } from "./index-CZYVfY9K.js";
import { r as reactExports, u as useNavigate, e as useLocation } from "./vendor-CYUu28OS.js";
import { C as Circle } from "./circle-vE8yasc-.js";
import { C as Camera$1, a as CameraResultType } from "./index-BJAMM_Pa.js";
import { C as Camera } from "./camera-BfDh98wj.js";
var RADIO_NAME = "Radio";
var [createRadioContext, createRadioScope] = createContextScope(RADIO_NAME);
var [RadioProvider, useRadioContext] = createRadioContext(RADIO_NAME);
var Radio = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadio,
      name,
      checked = false,
      required,
      disabled,
      value = "on",
      onCheck,
      form,
      ...radioProps
    } = props;
    const [button, setButton] = reactExports.useState(null);
    const composedRefs = useComposedRefs(forwardedRef, (node) => setButton(node));
    const hasConsumerStoppedPropagationRef = reactExports.useRef(false);
    const isFormControl = button ? form || !!button.closest("form") : true;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioProvider, { scope: __scopeRadio, checked, disabled, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Primitive.button,
        {
          type: "button",
          role: "radio",
          "aria-checked": checked,
          "data-state": getState(checked),
          "data-disabled": disabled ? "" : void 0,
          disabled,
          value,
          ...radioProps,
          ref: composedRefs,
          onClick: composeEventHandlers(props.onClick, (event) => {
            if (!checked) onCheck?.();
            if (isFormControl) {
              hasConsumerStoppedPropagationRef.current = event.isPropagationStopped();
              if (!hasConsumerStoppedPropagationRef.current) event.stopPropagation();
            }
          })
        }
      ),
      isFormControl && /* @__PURE__ */ jsxRuntimeExports.jsx(
        BubbleInput,
        {
          control: button,
          bubbles: !hasConsumerStoppedPropagationRef.current,
          name,
          value,
          checked,
          required,
          disabled,
          form,
          style: { transform: "translateX(-100%)" }
        }
      )
    ] });
  }
);
Radio.displayName = RADIO_NAME;
var INDICATOR_NAME = "RadioIndicator";
var RadioIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadio, forceMount, ...indicatorProps } = props;
    const context = useRadioContext(INDICATOR_NAME, __scopeRadio);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Presence, { present: forceMount || context.checked, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.span,
      {
        "data-state": getState(context.checked),
        "data-disabled": context.disabled ? "" : void 0,
        ...indicatorProps,
        ref: forwardedRef
      }
    ) });
  }
);
RadioIndicator.displayName = INDICATOR_NAME;
var BubbleInput = (props) => {
  const { control, checked, bubbles = true, ...inputProps } = props;
  const ref = reactExports.useRef(null);
  const prevChecked = usePrevious(checked);
  const controlSize = useSize(control);
  reactExports.useEffect(() => {
    const input = ref.current;
    const inputProto = window.HTMLInputElement.prototype;
    const descriptor = Object.getOwnPropertyDescriptor(inputProto, "checked");
    const setChecked = descriptor.set;
    if (prevChecked !== checked && setChecked) {
      const event = new Event("click", { bubbles });
      setChecked.call(input, checked);
      input.dispatchEvent(event);
    }
  }, [prevChecked, checked, bubbles]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type: "radio",
      "aria-hidden": true,
      defaultChecked: checked,
      ...inputProps,
      tabIndex: -1,
      ref,
      style: {
        ...props.style,
        ...controlSize,
        position: "absolute",
        pointerEvents: "none",
        opacity: 0,
        margin: 0
      }
    }
  );
};
function getState(checked) {
  return checked ? "checked" : "unchecked";
}
var ARROW_KEYS = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
var RADIO_GROUP_NAME = "RadioGroup";
var [createRadioGroupContext, createRadioGroupScope] = createContextScope(RADIO_GROUP_NAME, [
  createRovingFocusGroupScope,
  createRadioScope
]);
var useRovingFocusGroupScope = createRovingFocusGroupScope();
var useRadioScope = createRadioScope();
var [RadioGroupProvider, useRadioGroupContext] = createRadioGroupContext(RADIO_GROUP_NAME);
var RadioGroup$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeRadioGroup,
      name,
      defaultValue,
      value: valueProp,
      required = false,
      disabled = false,
      orientation,
      dir,
      loop = true,
      onValueChange,
      ...groupProps
    } = props;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const direction = useDirection(dir);
    const [value, setValue] = useControllableState({
      prop: valueProp,
      defaultProp: defaultValue,
      onChange: onValueChange
    });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      RadioGroupProvider,
      {
        scope: __scopeRadioGroup,
        name,
        required,
        disabled,
        value,
        onValueChange: setValue,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Root,
          {
            asChild: true,
            ...rovingFocusGroupScope,
            orientation,
            dir: direction,
            loop,
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Primitive.div,
              {
                role: "radiogroup",
                "aria-required": required,
                "aria-orientation": orientation,
                "data-disabled": disabled ? "" : void 0,
                dir: direction,
                ...groupProps,
                ref: forwardedRef
              }
            )
          }
        )
      }
    );
  }
);
RadioGroup$1.displayName = RADIO_GROUP_NAME;
var ITEM_NAME = "RadioGroupItem";
var RadioGroupItem$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, disabled, ...itemProps } = props;
    const context = useRadioGroupContext(ITEM_NAME, __scopeRadioGroup);
    const isDisabled = context.disabled || disabled;
    const rovingFocusGroupScope = useRovingFocusGroupScope(__scopeRadioGroup);
    const radioScope = useRadioScope(__scopeRadioGroup);
    const ref = reactExports.useRef(null);
    const composedRefs = useComposedRefs(forwardedRef, ref);
    const checked = context.value === itemProps.value;
    const isArrowKeyPressedRef = reactExports.useRef(false);
    reactExports.useEffect(() => {
      const handleKeyDown = (event) => {
        if (ARROW_KEYS.includes(event.key)) {
          isArrowKeyPressedRef.current = true;
        }
      };
      const handleKeyUp = () => isArrowKeyPressedRef.current = false;
      document.addEventListener("keydown", handleKeyDown);
      document.addEventListener("keyup", handleKeyUp);
      return () => {
        document.removeEventListener("keydown", handleKeyDown);
        document.removeEventListener("keyup", handleKeyUp);
      };
    }, []);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Item,
      {
        asChild: true,
        ...rovingFocusGroupScope,
        focusable: !isDisabled,
        active: checked,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Radio,
          {
            disabled: isDisabled,
            required: context.required,
            checked,
            ...radioScope,
            ...itemProps,
            name: context.name,
            ref: composedRefs,
            onCheck: () => context.onValueChange(itemProps.value),
            onKeyDown: composeEventHandlers((event) => {
              if (event.key === "Enter") event.preventDefault();
            }),
            onFocus: composeEventHandlers(itemProps.onFocus, () => {
              if (isArrowKeyPressedRef.current) ref.current?.click();
            })
          }
        )
      }
    );
  }
);
RadioGroupItem$1.displayName = ITEM_NAME;
var INDICATOR_NAME2 = "RadioGroupIndicator";
var RadioGroupIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeRadioGroup, ...indicatorProps } = props;
    const radioScope = useRadioScope(__scopeRadioGroup);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioIndicator, { ...radioScope, ...indicatorProps, ref: forwardedRef });
  }
);
RadioGroupIndicator.displayName = INDICATOR_NAME2;
var Root2 = RadioGroup$1;
var Item2 = RadioGroupItem$1;
var Indicator = RadioGroupIndicator;
const RadioGroup = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root2,
    {
      className: cn("grid gap-2", className),
      ...props,
      ref
    }
  );
});
RadioGroup.displayName = Root2.displayName;
const RadioGroupItem = reactExports.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Item2,
    {
      ref,
      className: cn(
        "aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Indicator, { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Circle, { className: "h-2.5 w-2.5 fill-current text-current" }) })
    }
  );
});
RadioGroupItem.displayName = Item2.displayName;
const addressCache = /* @__PURE__ */ new Map();
const CACHE_DURATION = 60 * 60 * 1e3;
const formatDetailedAddress = (feature, language) => {
  const context = feature.context || [];
  feature.properties || {};
  let street = "";
  let houseNumber = "";
  let neighborhood = "";
  let locality = "";
  let place = "";
  if (feature.place_type && feature.place_type.includes("address")) {
    houseNumber = feature.address || "";
    street = feature.text || "";
  } else if (feature.place_type && feature.place_type.includes("poi")) {
    street = feature.text || "";
  }
  context.forEach((item) => {
    const itemType = item.id?.split(".")[0];
    switch (itemType) {
      case "address":
        if (!street) street = item.text;
        break;
      case "neighborhood":
        neighborhood = item.text;
        break;
      case "locality":
        locality = item.text;
        break;
      case "place":
        place = item.text;
        break;
    }
  });
  let formattedAddress = "";
  if (street) {
    if (houseNumber) {
      formattedAddress = `${street} ${houseNumber}`;
    } else {
      formattedAddress = street;
    }
    if (neighborhood && neighborhood !== street && !formattedAddress.includes(neighborhood)) {
      formattedAddress += `, ${neighborhood}`;
    }
    const cityName = locality || place;
    if (cityName && !formattedAddress.includes(cityName)) {
      formattedAddress += `, ${cityName}`;
    }
  } else if (neighborhood) {
    formattedAddress = neighborhood;
    const cityName = locality || place;
    if (cityName && !formattedAddress.includes(cityName)) {
      formattedAddress += `, ${cityName}`;
    }
  } else {
    formattedAddress = feature.place_name || feature.text || "";
  }
  return formattedAddress;
};
const getAddressFromCoordinates = async (lat, lng, language = "en", mapboxToken) => {
  const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)},${language}`;
  const cached = addressCache.get(cacheKey);
  if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
    console.log("📍 Адрес получен из кэша:", cached.address);
    return cached.address;
  }
  try {
    console.log("🌐 Запрос адреса через Mapbox API для:", lat, lng);
    const mapboxLanguage = language === "ru" ? "ru" : language === "es" ? "es" : "en";
    const placeTypes = "address,poi,neighborhood,locality,place";
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&language=${mapboxLanguage}&limit=1&types=${placeTypes}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const address = formatDetailedAddress(feature, language);
      addressCache.set(cacheKey, {
        address,
        timestamp: Date.now()
      });
      console.log("✅ Детальный адрес получен:", address);
      return address;
    }
    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    console.log("⚠️ Адрес не найден, используем координаты:", fallbackAddress);
    return fallbackAddress;
  } catch (error) {
    console.error("❌ Ошибка получения адреса:", error);
    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    return fallbackAddress;
  }
};
const getShortAddress = async (lat, lng, language = "en", mapboxToken) => {
  try {
    const mapboxLanguage = language === "ru" ? "ru" : language === "es" ? "es" : "en";
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&language=${mapboxLanguage}&limit=1&types=address`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const street = feature.text || "";
      const houseNumber = feature.address || "";
      if (street && houseNumber) {
        return `${street} ${houseNumber}`;
      } else if (street) {
        return street;
      }
    }
    return await getAddressFromCoordinates(lat, lng, language, mapboxToken);
  } catch (error) {
    console.error("❌ Ошибка получения краткого адреса:", error);
    return await getAddressFromCoordinates(lat, lng, language, mapboxToken);
  }
};
const getFreshAddress = async (lat, lng, language = "en", mapboxToken) => {
  try {
    console.log("🔄 Принудительное обновление адреса для:", lat, lng);
    const mapboxLanguage = language === "ru" ? "ru" : language === "es" ? "es" : "en";
    const placeTypes = "address,poi,neighborhood,locality,place";
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxToken}&language=${mapboxLanguage}&limit=1&types=${placeTypes}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      const feature = data.features[0];
      const address = formatDetailedAddress(feature, language);
      const cacheKey = `${lat.toFixed(6)},${lng.toFixed(6)},${language}`;
      addressCache.set(cacheKey, {
        address,
        timestamp: Date.now()
      });
      console.log("✅ Свежий детальный адрес получен:", address);
      return address;
    }
    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    console.log("⚠️ Адрес не найден, используем координаты:", fallbackAddress);
    return fallbackAddress;
  } catch (error) {
    console.error("❌ Ошибка получения свежего адреса:", error);
    const fallbackAddress = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
    return fallbackAddress;
  }
};
const clearAddressCache = () => {
  addressCache.clear();
  console.log("🗑️ Кэш адресов очищен");
};
const getCacheSize = () => {
  return addressCache.size;
};
const cleanupCache = () => {
  const now = Date.now();
  let cleaned = 0;
  for (const [key, value] of addressCache.entries()) {
    if (now - value.timestamp >= CACHE_DURATION) {
      addressCache.delete(key);
      cleaned++;
    }
  }
  if (cleaned > 0) {
    console.log(`🧹 Очищено ${cleaned} устаревших записей из кэша`);
  }
};
const updateAllIncidentAddresses = async (supabase2, mapboxToken, language = "es", limit = 50) => {
  console.log("🔄 Начинаем обновление адресов инцидентов...");
  let updated = 0;
  let errors = 0;
  try {
    const { data: incidents, error } = await supabase2.from("incidents").select("id, latitude, longitude, address").not("latitude", "is", null).not("longitude", "is", null).limit(limit);
    if (error) {
      console.error("❌ Ошибка получения инцидентов:", error);
      return { updated: 0, errors: 1 };
    }
    console.log(`📋 Найдено ${incidents?.length || 0} инцидентов для обновления`);
    if (!incidents || incidents.length === 0) {
      return { updated: 0, errors: 0 };
    }
    for (const incident of incidents) {
      try {
        console.log(`🌐 Обновляем адрес для инцидента ${incident.id}...`);
        const newAddress = await getFreshAddress(
          incident.latitude,
          incident.longitude,
          language,
          mapboxToken
        );
        if (newAddress !== incident.address) {
          const { error: updateError } = await supabase2.from("incidents").update({ address: newAddress }).eq("id", incident.id);
          if (updateError) {
            console.error(`❌ Ошибка обновления инцидента ${incident.id}:`, updateError);
            errors++;
          } else {
            console.log(`✅ Адрес обновлен для инцидента ${incident.id}: ${newAddress}`);
            updated++;
          }
        } else {
          console.log(`⏭️ Адрес не изменился для инцидента ${incident.id}`);
        }
        await new Promise((resolve) => setTimeout(resolve, 200));
      } catch (error2) {
        console.error(`❌ Ошибка обработки инцидента ${incident.id}:`, error2);
        errors++;
      }
    }
    console.log(`🎉 Обновление завершено: ${updated} успешно, ${errors} ошибок`);
    return { updated, errors };
  } catch (error) {
    console.error("❌ Критическая ошибка при обновлении адресов:", error);
    return { updated, errors: errors + 1 };
  }
};
if (typeof window !== "undefined") {
  window.RadarGeocodingUtils = {
    clearCache: clearAddressCache,
    getCacheSize,
    cleanupCache,
    updateAllAddresses: updateAllIncidentAddresses,
    getFreshAddress,
    getShortAddress
  };
  console.log("🛠️ Утилиты геокодирования доступны в window.RadarGeocodingUtils");
  console.log("📖 Доступные функции:");
  console.log("  - clearCache() - очистить кэш адресов");
  console.log("  - getCacheSize() - размер кэша");
  console.log("  - cleanupCache() - очистить устаревшие записи");
  console.log("  - updateAllAddresses(supabase, token, language, limit) - обновить адреса в БД");
  console.log("  - getFreshAddress(lat, lng, lang, token) - получить свежий адрес");
}
const getSeverityForType = (type) => {
  const criticalSeverityTypes = ["kidnapping", "sexual_assault"];
  const highSeverityTypes = [
    "assault",
    "domestic_violence",
    "medical_emergency",
    "fire",
    "arson",
    "illegal_weapons"
  ];
  const mediumSeverityTypes = [
    "theft",
    "traffic_accident",
    "vandalism",
    "drug_activity",
    "vehicle_theft",
    "burglary",
    "hit_and_run",
    "missing_person"
  ];
  if (criticalSeverityTypes.includes(type)) return "critical";
  if (highSeverityTypes.includes(type)) return "high";
  if (mediumSeverityTypes.includes(type)) return "medium";
  return "low";
};
const ReportScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();
  const { user } = useAuth();
  const editIncident = location.state?.editIncident;
  const isEditing = !!editIncident;
  const mapRef = reactExports.useRef(null);
  const [selectedType, setSelectedType] = reactExports.useState(editIncident?.type || "");
  const selectedTypeRef = reactExports.useRef(editIncident?.type || "");
  const [title, setTitle] = reactExports.useState(editIncident?.title || "");
  const [description, setDescription] = reactExports.useState(editIncident?.description || "");
  const [inputTitle, setInputTitle] = reactExports.useState(editIncident?.title || "");
  const [inputDescription, setInputDescription] = reactExports.useState(editIncident?.description || "");
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setTitle(inputTitle);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputTitle]);
  reactExports.useEffect(() => {
    const handler = setTimeout(() => {
      setDescription(inputDescription);
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [inputDescription]);
  const [photos, setPhotos] = reactExports.useState(editIncident?.photos || []);
  const [loading, setLoading] = reactExports.useState(false);
  const [map, setMap] = reactExports.useState(null);
  const [selectedLocation, setSelectedLocation] = reactExports.useState(
    editIncident ? {
      lat: editIncident.latitude,
      lng: editIncident.longitude,
      address: editIncident.address
    } : null
  );
  const [locationMethod, setLocationMethod] = reactExports.useState("map");
  const [marker, setMarker] = reactExports.useState(null);
  const [mapLoaded, setMapLoaded] = reactExports.useState(false);
  const [isGeolocating, setIsGeolocating] = reactExports.useState(false);
  const [galleryOpen, setGalleryOpen] = reactExports.useState(false);
  const [selectedPhotoIndex, setSelectedPhotoIndex] = reactExports.useState(0);
  const CARACAS_COORDS = [-66.9036, 10.485];
  const MAPBOX_TOKEN = "pk.eyJ1IjoiaWNyeXB0b2ZyZWFrIiwiYSI6ImNtYnhieGE4cjFhcW8ya3B1NXRreThxZXIifQ.s32qHjkFoiS-Qauyqa6REg";
  reactExports.useEffect(() => {
    selectedTypeRef.current = selectedType;
  }, [selectedType]);
  reactExports.useEffect(() => {
    if (isEditing && editIncident && map && mapLoaded && selectedLocation) {
      console.log("Устанавливаем маркер для редактируемого инцидента:", editIncident);
      setLocationOnMap(selectedLocation.lat, selectedLocation.lng, map, false);
      map.flyTo({
        center: [selectedLocation.lng, selectedLocation.lat],
        zoom: 15,
        duration: 1e3
      });
    }
  }, [isEditing, editIncident, map, mapLoaded, selectedLocation]);
  const incidentTypes = [
    { key: "theft", label: t("theft"), color: "bg-warning" },
    { key: "assault", label: t("assault"), color: "bg-danger" },
    { key: "vandalism", label: t("vandalism"), color: "bg-orange-500" },
    { key: "suspicious_activity", label: t("suspicious"), color: "bg-yellow-500" },
    { key: "traffic_accident", label: t("accident"), color: "bg-red-600" },
    { key: "other", label: t("other"), color: "bg-gray-500" }
  ];
  const getMarkerColor = (incidentType) => {
    const type = incidentTypes.find((t2) => t2.key === incidentType);
    switch (type?.key) {
      case "assault":
        return "#DC2626";
      case "traffic_accident":
        return "#EF4444";
      case "theft":
        return "#F97316";
      case "vandalism":
        return "#F59E0B";
      case "suspicious_activity":
        return "#EAB308";
      case "other":
        return "#84CC16";
      default:
        return "#DC2626";
    }
  };
  reactExports.useEffect(() => {
    initializeMapbox();
  }, []);
  const initializeMapbox = () => {
    if (!mapRef.current) return;
    mapboxgl.accessToken = MAPBOX_TOKEN;
    try {
      const newMap = new mapboxgl.Map({
        container: mapRef.current,
        style: "mapbox://styles/mapbox/dark-v11",
        center: CARACAS_COORDS,
        zoom: 12,
        pitch: 0,
        bearing: 0
      });
      newMap.addControl(new mapboxgl.NavigationControl(), "top-right");
      newMap.on("load", () => {
        setMap(newMap);
        setMapLoaded(true);
      });
      newMap.on("click", (event) => {
        if (locationMethod === "map" && !isGeolocating) {
          const { lng, lat } = event.lngLat;
          const currentSelectedType = selectedTypeRef.current;
          if (!currentSelectedType || currentSelectedType === "") {
            toast({
              title: t("selectIncidentType"),
              description: t("selectIncidentTypeDesc")
            });
            return;
          }
          console.log("Клик на карту в позиции:", lat, lng);
          const existingMarkers = document.querySelectorAll(".mapboxgl-marker");
          console.log("Найдено маркеров для удаления:", existingMarkers.length);
          existingMarkers.forEach((markerEl) => {
            markerEl.remove();
          });
          setMarker(null);
          setLocationOnMap(lat, lng, newMap, false);
        }
      });
    } catch (error) {
      console.error("Ошибка при создании Mapbox карты:", error);
      toast({
        title: t("mapInitError"),
        description: t("mapInitErrorDesc")
      });
    }
  };
  const createMarkerElement = (color) => {
    const el = document.createElement("div");
    el.innerHTML = `
      <svg viewBox="-4 0 36 36" width="32" height="36" xmlns="http://www.w3.org/2000/svg">
        <path d="M14,0 C21.732,0 28,5.641 28,12.6 C28,23.963 14,36 14,36 C14,36 0,24.064 0,12.6 C0,5.641 6.268,0 14,0 Z" fill="#FF6E6E"/>
        <circle cx="14" cy="14" r="7" fill="#0C0058"/>
      </svg>
    `;
    return el;
  };
  const setLocationOnMap = async (lat, lng, mapInstance, showToast = true) => {
    const currentMap = mapInstance || map;
    if (!currentMap) {
      if (showToast) {
        toast({
          title: t("mapError"),
          description: t("mapErrorDesc")
        });
      }
      return;
    }
    const markerColor = getMarkerColor(selectedTypeRef.current);
    try {
      if (marker) {
        console.log("Удаляем предыдущий маркер, тип:", typeof marker, "методы:", Object.getOwnPropertyNames(marker));
        try {
          marker.remove();
          console.log("Маркер успешно удален");
        } catch (removeError) {
          console.error("Ошибка при удалении маркера:", removeError);
        }
      }
      setMarker(null);
      await new Promise((resolve) => setTimeout(resolve, 10));
      console.log("Создаем новый маркер в позиции:", lat, lng);
      const markerElement = createMarkerElement(markerColor);
      const newMarker = new mapboxgl.Marker(markerElement).setLngLat([lng, lat]).addTo(currentMap);
      setMarker(newMarker);
      currentMap.setCenter([lng, lat]);
      console.log("🌐 Получаем детальный адрес для координат:", lat, lng);
      const currentLanguage = localStorage.getItem("language") || "es";
      const address = await getFreshAddress(
        lat,
        lng,
        currentLanguage,
        MAPBOX_TOKEN
      );
      setSelectedLocation({
        lat,
        lng,
        address
      });
      if (showToast) {
        toast({
          title: t("locationSelected"),
          description: `${t("locationSelectedDesc")}: ${address}`
        });
      }
    } catch (error) {
      console.error("Ошибка при создании маркера:", error);
      if (showToast) {
        toast({
          title: t("markerError"),
          description: t("markerErrorDesc")
        });
      }
    }
  };
  const clearAllMarkers = () => {
    if (map) {
      const markers = document.querySelectorAll(".mapboxgl-marker");
      markers.forEach((markerEl) => {
        markerEl.remove();
      });
      console.log("Очищены все маркеры с карты, количество:", markers.length);
    }
  };
  reactExports.useEffect(() => {
    if (selectedType && marker && selectedLocation && map) {
      console.log("Обновляем маркер для нового типа инцидента:", selectedType);
      getMarkerColor(selectedType);
      try {
        marker.remove();
        console.log("Старый маркер удален при смене типа");
      } catch (error) {
        console.error("Ошибка удаления старого маркера:", error);
        clearAllMarkers();
      }
      const newMarkerElement = createMarkerElement();
      const newMarker = new mapboxgl.Marker(newMarkerElement).setLngLat([selectedLocation.lng, selectedLocation.lat]).addTo(map);
      setMarker(newMarker);
    }
  }, [selectedType, map]);
  const getCurrentLocation = async () => {
    if (!selectedType || selectedType === "") {
      toast({
        title: t("selectIncidentType"),
        description: t("selectIncidentTypeGeo")
      });
      return;
    }
    setIsGeolocating(true);
    try {
      const position = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 1e4
      });
      const { latitude, longitude } = position.coords;
      setLocationOnMap(latitude, longitude, map, true);
      setIsGeolocating(false);
    } catch (error) {
      console.error("Ошибка получения геолокации:", error);
      setLocationOnMap(CARACAS_COORDS[1], CARACAS_COORDS[0], map, true);
      setIsGeolocating(false);
      toast({
        title: t("geolocationError"),
        description: t("usingDefaultLocation")
      });
    }
  };
  const uploadPhoto = async (photoDataUrl) => {
    if (!user) return null;
    try {
      const response = await fetch(photoDataUrl);
      const blob = await response.blob();
      const fileName = `${user.id}/${Date.now()}.jpg`;
      const { data, error } = await supabase.storage.from("incident-images").upload(fileName, blob);
      if (error) {
        console.error("Error uploading photo:", error);
        return null;
      }
      const { data: { publicUrl } } = supabase.storage.from("incident-images").getPublicUrl(data.path);
      return publicUrl;
    } catch (error) {
      console.error("Error processing photo:", error);
      return null;
    }
  };
  const takePhoto = async () => {
    try {
      const image = await Camera$1.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.DataUrl
      });
      if (image.dataUrl) {
        setPhotos([...photos, image.dataUrl]);
        toast({
          title: t("photoAdded"),
          description: t("photoAddedDesc")
        });
      }
    } catch (error) {
      console.error("Error taking photo:", error);
      toast({
        title: t("cameraError"),
        description: t("cameraErrorDesc")
      });
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: t("authRequired"),
        description: t("authRequiredDesc"),
        variant: "destructive"
      });
      return;
    }
    if (!selectedType || !title || !description) {
      toast({
        title: t("validationError"),
        description: t("fillAllFieldsDesc")
      });
      return;
    }
    if (!selectedLocation) {
      toast({
        title: t("specifyLocation"),
        description: t("specifyLocationDesc")
      });
      return;
    }
    setLoading(true);
    try {
      let imageUrl = null;
      if (photos.length > 0) {
        imageUrl = await uploadPhoto(photos[0]);
      }
      const { error } = await supabase.from("incidents").insert({
        user_id: user.id,
        title,
        description,
        incident_type: selectedType,
        severity: getSeverityForType(selectedType),
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        address: selectedLocation.address,
        image_url: imageUrl
      });
      if (error) {
        console.error("Error creating incident:", error);
        toast({
          title: t("errorTitle"),
          description: t("reportErrorDesc"),
          variant: "destructive"
        });
      } else {
        toast({
          title: t("reportSent"),
          description: t("reportSentDesc")
        });
        navigate("/main", { state: { refreshIncidents: true } });
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      toast({
        title: t("errorTitle"),
        description: t("reportErrorDesc"),
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  const handleTypeSelection = (type) => {
    setSelectedType(type);
  };
  const openPhotoGallery = (index) => {
    setSelectedPhotoIndex(index);
    setGalleryOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-dark", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center mb-6 p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-white", children: t("reportIncident") }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 pb-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #23272b"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("incidentType") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: incidentTypes.map((type) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              variant: selectedType === type.key ? "default" : "outline",
              onClick: () => handleTypeSelection(type.key),
              className: selectedType === type.key ? `${type.color} hover:opacity-80 text-white` : "border-border text-gray-400 hover:text-white",
              children: type.label
            },
            type.key
          )) }),
          selectedType && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 p-3 bg-[#23272b] border border-[#2d3237] rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-blue-400 font-medium mb-1", children: t("incidentDuration") }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-300", children: (() => {
                const duration = INCIDENT_DURATION_LIMITS[selectedType] || 24;
                const incidentTypeLabel = incidentTypes.find((t2) => t2.key === selectedType)?.label;
                if (duration < 24) {
                  return `${incidentTypeLabel} ${t("expiresIn")} ${duration} ${t("hoursShort")}`;
                } else {
                  const days = Math.floor(duration / 24);
                  const hours = duration % 24;
                  if (hours === 0) {
                    return `${incidentTypeLabel} ${t("expiresIn")} ${days} ${t("daysShort")}`;
                  } else {
                    return `${incidentTypeLabel} ${t("expiresIn")} ${days} ${t("daysShort")} ${hours} ${t("hoursShort")}`;
                  }
                }
              })() }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center mt-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3 text-gray-400 mr-1" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400", children: t("autoRemovalInfo") })
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #23272b"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("incidentLocation") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            RadioGroup,
            {
              value: locationMethod,
              onValueChange: (value) => {
                setLocationMethod(value);
              },
              className: "flex flex-row space-x-6",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "map", id: "map" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "map", className: "text-white text-sm", children: t("selectOnMap") })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center space-x-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroupItem, { value: "gps", id: "gps" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "gps", className: "text-white text-sm", children: t("currentLocation") })
                ] })
              ]
            }
          ) }),
          locationMethod === "gps" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex space-x-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              type: "button",
              onClick: getCurrentLocation,
              disabled: !selectedType || isGeolocating,
              className: "bg-[#4fcbe9] hover:bg-[#4fcbe9]/90 text-white disabled:opacity-50",
              children: isGeolocating ? t("determining") : t("useMyGeolocation")
            }
          ) }),
          !mapLoaded && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-dark-light border border-border rounded p-3 flex flex-col items-center justify-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SemipolarSpinner, { size: 40, color: "#3b82f6", className: "mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-sm", children: t("loadingMapboxMap") })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-64 relative rounded-lg overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                ref: mapRef,
                className: "w-full h-full"
              }
            ),
            locationMethod === "map" && mapLoaded && !isGeolocating && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 bg-black/70 text-white text-xs p-2 rounded", children: selectedType ? `${t("clickToSelectLocation")} ${incidentTypes.find((t2) => t2.key === selectedType)?.label.toLowerCase()}` : t("firstSelectIncidentType") })
          ] }),
          selectedLocation && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-dark-light border border-border rounded p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start space-x-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-4 h-4 text-red-500 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-white text-sm font-medium", children: [
                t("selectedLocation"),
                ":"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-400 text-xs", children: selectedLocation.address }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-500 text-xs", children: [
                selectedLocation.lat.toFixed(6),
                ", ",
                selectedLocation.lng.toFixed(6)
              ] }),
              selectedType && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-gray-400 text-xs mt-1", children: [
                t("type"),
                ": ",
                incidentTypes.find((t2) => t2.key === selectedType)?.label
              ] })
            ] })
          ] }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #23272b"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("title") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedInput,
          {
            placeholder: t("titlePlaceholder"),
            value: inputTitle,
            onChange: (e) => setInputTitle(e.target.value),
            className: "bg-dark-light border-border text-white"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #23272b"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "text-white", children: t("detailedDescription") }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          OptimizedTextarea,
          {
            placeholder: t("descriptionPlaceholder"),
            value: inputDescription,
            onChange: (e) => setInputDescription(e.target.value),
            rows: 4,
            className: "bg-dark-light border-border text-white"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "profile-card-neumorph", style: {
        borderRadius: "14px",
        background: "#1e2327",
        boxShadow: "inset -5px 5px 9px #14171a, inset 5px -5px 9px #282f34",
        border: "1px solid #23272b"
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "text-white flex items-center justify-between", children: [
          t("photos"),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", className: "text-warning border-warning", children: [
            photos.length,
            "/5"
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              type: "button",
              variant: "outline",
              onClick: takePhoto,
              disabled: photos.length >= 5,
              className: "w-full border-border text-gray-400 hover:text-white",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "w-5 h-5 mr-2" }),
                t("takePhoto")
              ]
            }
          ),
          photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: photos.map((photo, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: photo,
                  alt: `${t("photo")} ${index + 1}`,
                  className: "w-full h-20 object-cover rounded border border-border cursor-pointer transition-all duration-200 group-hover:brightness-75",
                  onClick: () => openPhotoGallery(index)
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40 rounded cursor-pointer",
                  onClick: () => openPhotoGallery(index),
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5 text-white" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "button",
                  variant: "destructive",
                  size: "sm",
                  onClick: (e) => {
                    e.stopPropagation();
                    setPhotos(photos.filter((_, i) => i !== index));
                  },
                  className: "absolute -top-2 -right-2 w-6 h-6 rounded-full p-0 z-10",
                  children: "×"
                }
              ),
              photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-1 left-1 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded", children: [
                index + 1,
                "/",
                photos.length
              ] })
            ] }, index)) }),
            photos.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-400 text-center", children: t("clickToViewGallery") })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "submit",
          disabled: loading,
          className: "w-full bg-[#f3533b] text-white text-lg font-semibold py-3 mt-6 hover:bg-[#f3533b]/90",
          children: loading ? t("sending") : t("sendReport")
        }
      )
    ] }) }),
    photos.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      PhotoGallery,
      {
        photos,
        isOpen: galleryOpen,
        onClose: () => setGalleryOpen(false),
        initialIndex: selectedPhotoIndex
      }
    )
  ] });
};
export {
  ReportScreen as default
};
