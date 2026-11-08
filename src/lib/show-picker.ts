import type { SyntheticEvent } from "react";

/** Opens the native date picker without relying on the virtual keyboard. */
export function openPicker(input: HTMLInputElement | null) {
  if (!input || input.type !== "date") return;
  if (!("showPicker" in HTMLInputElement.prototype)) return;
  try {
    input.showPicker();
  } catch {
    // Browsers with strict activation policies keep their default behavior.
  }
}

export const openPickerOn = (event: SyntheticEvent<HTMLInputElement>) =>
  openPicker(event.currentTarget);
