"use client";

import { useState } from "react";
import { Button } from "@/components/Button";
import { BedIcon, CalendarIcon, UsersIcon, WhatsAppIcon } from "@/components/Icons";
import { roomNameForSelect } from "@/data/rooms";
import { buildWhatsAppUrl, hasWhatsApp } from "@/lib/whatsapp";
import {
  buildStayMessage,
  countNights,
  MAX_GUESTS,
  validateStayQuery,
} from "@/lib/booking";
import type { StayFieldErrors, StayQuery } from "@/lib/booking";

const labelClasses = "mb-1.5 block text-sm font-medium text-text";

const fieldClasses =
  "w-full rounded-2xl border border-line bg-snow px-4 py-3 text-sm text-text transition-colors focus:border-pahadi focus:outline-none focus:ring-2 focus:ring-pahadi/25";

const fieldErrorClasses =
  "w-full rounded-2xl border border-rose-300 bg-snow px-4 py-3 text-sm text-text transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

const GUEST_OPTIONS = Array.from({ length: MAX_GUESTS }, (_, i) => String(i + 1));

const EMPTY_QUERY: StayQuery = {
  checkIn: "",
  checkOut: "",
  guests: "",
  roomType: "",
};

// Low-friction alternative to the full contact form: three inputs and the
// WhatsApp message is already written for the owner when it opens.
export function StayPlanner() {
  const [query, setQuery] = useState<StayQuery>(EMPTY_QUERY);
  const [errors, setErrors] = useState<StayFieldErrors>({});
  const [status, setStatus] = useState<"idle" | "opening">("idle");

  const nights = countNights(query.checkIn, query.checkOut);

  function update(field: keyof StayQuery, value: string) {
    setQuery((previous) => ({ ...previous, [field]: value }));
    // Clear a field's error as soon as the guest edits it, but don't clear an
    // error they haven't actually resolved yet.
    setErrors((previous) => {
      if (!previous[field as keyof StayFieldErrors]) return previous;
      const next = { ...previous };
      delete next[field as keyof StayFieldErrors];
      return next;
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validateStayQuery(query);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstInvalid = (["checkIn", "checkOut", "guests"] as const).find(
        (field) => nextErrors[field]
      );
      if (firstInvalid) {
        event.currentTarget.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus();
      }
      return;
    }

    const url = buildWhatsAppUrl(buildStayMessage(query));
    setStatus("opening");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  // Without a configured number there is no WhatsApp deep link to open, so the
  // planner steps aside and points at the enquiry form instead.
  if (!hasWhatsApp) {
    return (
      <div className="rounded-3xl border border-snow/25 bg-snow/10 p-6 text-center">
        <p className="text-sm leading-relaxed text-snow/85">
          Send us your dates and guest count and we&apos;ll reply with
          availability and pricing.
        </p>
        <Button href="/contact" size="lg" variant="light" className="mt-5 w-full sm:w-auto">
          Send an Enquiry
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-3xl border border-snow/25 bg-snow/10 p-5 text-left sm:p-7"
    >
      <div className="flex items-center gap-2 text-snow">
        <CalendarIcon className="h-5 w-5" />
        <h3 className="font-display text-xl font-semibold">
          Check availability
        </h3>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-snow/80">
        Pick your dates and we&apos;ll open WhatsApp with the enquiry already
        written. Nothing is confirmed until we reply.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="planner-check-in" className={labelClasses}>
            Check-in <span className="text-cafe">*</span>
          </label>
          <input
            id="planner-check-in"
            name="checkIn"
            type="date"
            required
            value={query.checkIn}
            onChange={(event) => update("checkIn", event.target.value)}
            aria-invalid={Boolean(errors.checkIn)}
            aria-describedby={errors.checkIn ? "planner-check-in-error" : undefined}
            className={errors.checkIn ? fieldErrorClasses : fieldClasses}
          />
          {errors.checkIn ? (
            <p
              id="planner-check-in-error"
              className="mt-1.5 text-xs font-medium text-rose-300"
              role="alert"
            >
              {errors.checkIn}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="planner-check-out" className={labelClasses}>
            Check-out
          </label>
          <input
            id="planner-check-out"
            name="checkOut"
            type="date"
            value={query.checkOut}
            onChange={(event) => update("checkOut", event.target.value)}
            aria-invalid={Boolean(errors.checkOut)}
            aria-describedby={errors.checkOut ? "planner-check-out-error" : undefined}
            className={errors.checkOut ? fieldErrorClasses : fieldClasses}
          />
          {errors.checkOut ? (
            <p
              id="planner-check-out-error"
              className="mt-1.5 text-xs font-medium text-rose-300"
              role="alert"
            >
              {errors.checkOut}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="planner-guests" className={labelClasses}>
            Guests
          </label>
          <div className="relative">
            <select
              id="planner-guests"
              name="guests"
              value={query.guests}
              onChange={(event) => update("guests", event.target.value)}
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "planner-guests-error" : undefined}
              className={`${errors.guests ? fieldErrorClasses : fieldClasses} appearance-none pr-10`}
            >
              <option value="">Select guests</option>
              {GUEST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
              <option value="More">More than {MAX_GUESTS}</option>
            </select>
            <UsersIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
          {errors.guests ? (
            <p
              id="planner-guests-error"
              className="mt-1.5 text-xs font-medium text-rose-300"
              role="alert"
            >
              {errors.guests}
            </p>
          ) : null}
        </div>

        <div>
          <label htmlFor="planner-room" className={labelClasses}>
            Room type
          </label>
          <div className="relative">
            <select
              id="planner-room"
              name="roomType"
              value={query.roomType}
              onChange={(event) => update("roomType", event.target.value)}
              className={`${fieldClasses} appearance-none pr-10`}
            >
              <option value="">Not sure yet</option>
              {roomNameForSelect().map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
            </select>
            <BedIcon className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
          </div>
        </div>
      </div>

      {nights ? (
        <p className="mt-4 text-sm font-medium text-snow" role="status">
          {nights} {nights === 1 ? "night" : "nights"} selected.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-snow px-7 py-3.5 text-base font-semibold text-pahadi shadow-sm transition-colors duration-200 hover:bg-line-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-snow"
      >
        <WhatsAppIcon className="h-5 w-5" />
        Check Availability on WhatsApp
      </button>

      {status === "opening" ? (
        <p className="mt-3 text-center text-sm font-medium text-snow/80" role="status">
          Opening WhatsApp with your enquiry…
        </p>
      ) : null}
      <p className="mt-3 text-center text-xs text-snow/70">
        Dates are requests, not confirmed bookings.
      </p>
    </form>
  );
}