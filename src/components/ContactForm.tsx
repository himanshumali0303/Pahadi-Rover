"use client";

import { useState } from "react";
import { buildRoomEnquiryMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import { roomNameForSelect } from "@/data/rooms";
import { WhatsAppIcon } from "@/components/Icons";

const inputClasses =
  "w-full rounded-2xl border border-line bg-snow px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:border-pahadi focus:outline-none focus:ring-2 focus:ring-pahadi/25";

const inputErrorClasses =
  "w-full rounded-2xl border border-rose-300 bg-snow px-4 py-3 text-sm text-text placeholder:text-muted/60 transition-colors focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-200";

const labelClasses = "mb-1.5 block text-sm font-medium text-text";

const GUEST_OPTIONS = ["1", "2", "3", "4", "5", "6", "7", "8", "More"];

type FieldErrors = Partial<
  Record<"name" | "phone" | "checkIn" | "checkOut" | "guests" | "roomType", string>
>;

function validatePhone(value: string): boolean {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

function isNotInPast(value: string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return new Date(value + "T00:00:00") >= today;
}

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "opening">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});

  function validate(formData: FormData): FieldErrors {
    const nextErrors: FieldErrors = {};
    const name = String(formData.get("name") ?? "").trim();
    const phone = String(formData.get("phone") ?? "").trim();
    const checkIn = String(formData.get("checkIn") ?? "");
    const checkOut = String(formData.get("checkOut") ?? "");
    const guests = String(formData.get("guests") ?? "");
    const roomType = String(formData.get("roomType") ?? "");

    if (!name) {
      nextErrors.name = "Please enter your name.";
    } else if (name.length < 2) {
      nextErrors.name = "Your name looks too short.";
    }

    if (!phone) {
      nextErrors.phone = "Please enter your phone number.";
    } else if (!validatePhone(phone)) {
      nextErrors.phone = "Please enter a valid phone number.";
    }

    if (!checkIn) {
      nextErrors.checkIn = "Please choose a check-in date.";
    } else if (!isNotInPast(checkIn)) {
      nextErrors.checkIn = "Check-in can't be in the past.";
    }

    if (checkOut) {
      if (!isNotInPast(checkOut)) {
        nextErrors.checkOut = "Check-out can't be in the past.";
      } else if (checkIn && checkOut < checkIn) {
        nextErrors.checkOut = "Check-out must be after check-in.";
      }
    }

    if (guests && guests !== "More") {
      const count = Number(guests);
      if (!Number.isInteger(count) || count < 1 || count > 8) {
        nextErrors.guests = "Please choose a valid number of guests.";
      }
    }

    if (!roomType) {
      nextErrors.roomType = "Please choose a room type.";
    }

    return nextErrors;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const nextErrors = validate(formData);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      const firstErrorField = ["name", "phone", "checkIn", "checkOut", "guests", "roomType"].find(
        (field) => nextErrors[field as keyof FieldErrors]
      );
      if (firstErrorField) {
        form.querySelector<HTMLElement>(`[name="${firstErrorField}"]`)?.focus();
      }
      return;
    }

    const enquiry = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      checkIn: String(formData.get("checkIn") ?? ""),
      checkOut: String(formData.get("checkOut") ?? ""),
      guests: String(formData.get("guests") ?? ""),
      roomType: String(formData.get("roomType") ?? ""),
      message: String(formData.get("message") ?? ""),
    };
    const url = buildWhatsAppUrl(buildRoomEnquiryMessage(enquiry));
    setStatus("opening");
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="rounded-3xl border border-line bg-snow p-6 shadow-sm sm:p-8">
      <h2 className="font-display text-2xl font-semibold text-text">
        Room Enquiry
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        Fill in a few details and we&apos;ll open WhatsApp with your enquiry ready
        to send. Nothing is confirmed until the owner replies.
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className={labelClasses}>
              Name <span className="text-cafe">*</span>
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              autoComplete="name"
              placeholder="Your name"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={errors.name ? inputErrorClasses : inputClasses}
            />
            {errors.name ? (
              <p id="name-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.name}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="phone" className={labelClasses}>
              Phone Number <span className="text-cafe">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              autoComplete="tel"
              placeholder="Your phone number"
              aria-invalid={Boolean(errors.phone)}
              aria-describedby={errors.phone ? "phone-error" : undefined}
              className={errors.phone ? inputErrorClasses : inputClasses}
            />
            {errors.phone ? (
              <p id="phone-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.phone}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkIn" className={labelClasses}>
              Check-in Date <span className="text-cafe">*</span>
            </label>
            <input
              id="checkIn"
              name="checkIn"
              type="date"
              required
              aria-invalid={Boolean(errors.checkIn)}
              aria-describedby={errors.checkIn ? "checkIn-error" : undefined}
              className={errors.checkIn ? inputErrorClasses : inputClasses}
            />
            {errors.checkIn ? (
              <p id="checkIn-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.checkIn}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="checkOut" className={labelClasses}>
              Check-out Date
            </label>
            <input
              id="checkOut"
              name="checkOut"
              type="date"
              aria-invalid={Boolean(errors.checkOut)}
              aria-describedby={errors.checkOut ? "checkOut-error" : undefined}
              className={errors.checkOut ? inputErrorClasses : inputClasses}
            />
            {errors.checkOut ? (
              <p id="checkOut-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.checkOut}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="guests" className={labelClasses}>
              Number of Guests
            </label>
            <select
              id="guests"
              name="guests"
              aria-invalid={Boolean(errors.guests)}
              aria-describedby={errors.guests ? "guests-error" : undefined}
              className={errors.guests ? inputErrorClasses : inputClasses}
            >
              <option value="">Select guests</option>
              {GUEST_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.guests ? (
              <p id="guests-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.guests}
              </p>
            ) : null}
          </div>
          <div>
            <label htmlFor="roomType" className={labelClasses}>
              Room Type <span className="text-cafe">*</span>
            </label>
            <select
              id="roomType"
              name="roomType"
              required
              aria-invalid={Boolean(errors.roomType)}
              aria-describedby={errors.roomType ? "roomType-error" : undefined}
              className={errors.roomType ? inputErrorClasses : inputClasses}
            >
              <option value="">Select room type</option>
              {roomNameForSelect().map((room) => (
                <option key={room.id} value={room.name}>
                  {room.name}
                </option>
              ))}
              <option value="Not sure yet">Not sure yet</option>
            </select>
            {errors.roomType ? (
              <p id="roomType-error" className="mt-1.5 text-xs font-medium text-rose-600" role="alert">
                {errors.roomType}
              </p>
            ) : null}
          </div>
        </div>

        <div>
          <label htmlFor="message" className={labelClasses}>
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={4}
            placeholder="Anything you'd like us to know — arrival time, preferences, etc."
            className={`${inputClasses} resize-y`}
          />
        </div>

        <button
          type="submit"
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-pahadi px-7 py-3.5 text-base font-semibold text-snow shadow-sm transition-colors duration-200 hover:bg-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pahadi"
        >
          <WhatsAppIcon className="h-5 w-5" />
          Send Enquiry on WhatsApp
        </button>
        {status === "opening" ? (
          <p className="text-center text-sm font-medium text-muted" role="status">
            Opening WhatsApp with your enquiry…
          </p>
        ) : null}
        <p className="text-center text-xs text-muted">
          By sending this enquiry you accept that dates are requests, not
          confirmed bookings.
        </p>
      </form>
    </div>
  );
}