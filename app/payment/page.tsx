"use client";
import React, { FunctionComponent, useState } from "react";
import { useSearchParams } from "next/navigation";

interface OwnProps {}

type Props = OwnProps;

const Page: FunctionComponent<Props> = (props) => {
    const searchParams = useSearchParams();
    const initialType = searchParams?.get("type") || "esummit";
    const [type, setType] = useState(initialType);

    const handleToggle = () => {
        setType(type === "esummit" ? "startup_junction" : "esummit");
    };

    return (
        <section className={"w-screen md:mt-14 p-4"}>
            <div className="flex flex-col items-center justify-start w-full min-h-[80vh] pt-6">
                <div className="flex justify-center items-center mb-8">
                    <label className="flex items-center cursor-pointer select-none">
                        <span className={`mr-3 ${type === "esummit" ? "text-blue-500" : "text-white"}`}>E-summit</span>
                        <div className="relative">
                            <input type="checkbox" className="sr-only" checked={type === "startup_junction"} onChange={handleToggle} />
                            <div className="block bg-gray-700 w-14 h-8 rounded-full shadow-inner"></div>
                            <div className={`dot absolute top-1 w-6 h-6 rounded-full transition-transform ${type === "esummit" ? "translate-x-0 bg-white" : "translate-x-6 bg-blue-500"} shadow`}></div>
                        </div>
                        <span className={`ml-3 ${type === "startup_junction" ? "text-blue-500" : "text-white"}`}>Startup Junction</span>
                    </label>
                </div>
                {type === "esummit" && (
                    <iframe id="ts-iframe" src="https://www.townscript.com/v2/widget/esummit-2025-iit-bhu-434033/booking" height="600" width="80%" className={"border rounded-2xl"} />
                )}
                {type === "startup_junction" && <StartupJunctionForm />}
            </div>
        </section>
    );
};

export default Page;

// -----------------------
// Startup Junction Form
// -----------------------

const eventLabel = "6 Dec 2025 | 3:00 PM IST onwards";

const StartupJunctionForm: React.FC = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [ticketCount, setTicketCount] = useState<number>(1);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [startupName, setStartupName] = useState("");
    const [phone, setPhone] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const increment = () => setTicketCount((c) => Math.min(10, c + 1));
    const decrement = () => setTicketCount((c) => Math.max(1, c - 1));

    const onSubmit = async () => {
        setSubmitting(true);
        setError(null);
        try {
            const form = new FormData();
            form.append("name", name.trim());
            form.append("email", email.trim());
            form.append("startup_name", startupName.trim());
            form.append("phone", phone.trim());
            form.append("ticket_count", String(ticketCount));
            if (file) form.append("attachment", file);

            const res = await fetch("/api/startup-junction/register", {
                method: "POST",
                body: form,
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data?.error || "Submission failed");
            setStep(3);
        } catch (e: any) {
            setError(e?.message || "Something went wrong");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto">
            {/* Stepper */}
            <div className="flex items-center justify-between mb-6 w-full">
                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium border ${
                            step >= 1 ? "bg-blue-600 text-white border-blue-600" : "bg-transparent text-white border-gray-600"
                        }`}
                    >
                        1
                    </div>
                </div>
                <div className={`h-px flex-1 mx-2 ${step > 1 ? "bg-blue-600" : "bg-gray-700"}`}></div>
                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium border ${
                            step >= 2 ? "bg-blue-600 text-white border-blue-600" : "bg-transparent text-white border-gray-600"
                        }`}
                    >
                        2
                    </div>
                </div>
                <div className={`h-px flex-1 mx-2 ${step > 2 ? "bg-blue-600" : "bg-gray-700"}`}></div>
                <div className="flex items-center">
                    <div
                        className={`flex items-center justify-center w-9 h-9 rounded-full text-sm font-medium border ${
                            step >= 3 ? "bg-blue-600 text-white border-blue-600" : "bg-transparent text-white border-gray-600"
                        }`}
                    >
                        3
                    </div>
                </div>
            </div>

            {/* Step 1: Tickets */}
            {step === 1 && (
                <div className="border border-gray-700 rounded-xl p-5 bg-black/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-white">Startup Junction Ticket</h2>
                            <p className="text-sm text-gray-300">{eventLabel}</p>
                            <p className="text-sm text-green-400 mt-1">₹999</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <button type="button" onClick={decrement} className="w-8 h-8 rounded-md border border-gray-600 text-white hover:bg-gray-800" aria-label="Decrease quantity">
                                −
                            </button>
                            <span className="min-w-6 text-center text-white">{ticketCount}</span>
                            <button type="button" onClick={increment} className="w-8 h-8 rounded-md border border-gray-600 text-white hover:bg-gray-800" aria-label="Increase quantity">
                                +
                            </button>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button type="button" onClick={() => setStep(2)} className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60" disabled={ticketCount < 1}>
                            Continue
                        </button>
                    </div>
                </div>
            )}

            {/* Step 2: Details */}
            {step === 2 && (
                <div className="border border-gray-700 rounded-xl p-5 bg-black/30">
                    <h2 className="text-lg font-semibold text-white mb-4">Attendee Details</h2>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Your full name"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Email</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Startup Name</label>
                            <input
                                value={startupName}
                                onChange={(e) => setStartupName(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="Your startup"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Phone Number</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                className="w-full px-3 py-2 rounded-md bg-transparent border border-gray-600 text-white focus:outline-none focus:ring-1 focus:ring-blue-600"
                                placeholder="e.g. +91 98765 43210"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-gray-300 mb-1">Attachment (optional)</label>
                            <input
                                type="file"
                                accept="image/*,application/pdf"
                                onChange={(e) => setFile(e.target.files?.[0] || null)}
                                className="w-full text-sm text-gray-300 file:mr-3 file:px-3 file:py-2 file:rounded-md file:border-0 file:bg-gray-700 file:text-white hover:file:bg-gray-600"
                            />
                            <p className="text-xs text-gray-400 mt-1">Upload pitch deck, logo, or any supporting file (PDF/JPG/PNG).</p>
                        </div>
                    </div>
                    {error && <p className="text-sm text-red-400 mt-3">{error}</p>}
                    <div className="mt-6 flex items-center justify-between">
                        <button type="button" onClick={() => setStep(1)} className="px-4 py-2 rounded-md border border-gray-600 text-white hover:bg-gray-800">
                            Back
                        </button>
                        <button
                            type="button"
                            onClick={onSubmit}
                            disabled={submitting || !name || !email || !startupName || !phone}
                            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-60"
                        >
                            {submitting ? "Submitting…" : "Submit"}
                        </button>
                    </div>
                </div>
            )}

            {/* Step 3: Success */}
            {step === 3 && (
                <div className="border border-gray-700 rounded-xl p-8 bg-black/30 text-center">
                    <h2 className="text-xl font-semibold text-white">Registration received</h2>
                    <p className="text-gray-300 mt-2">
                        You’ve registered {ticketCount} ticket{ticketCount > 1 ? "s" : ""} for Startup Junction.
                    </p>
                    <p className="text-gray-400 mt-1">Event: {eventLabel}</p>
                    <p className="text-gray-400 mt-1">we'll contact you soon.</p>
                    <div className="mt-6">
                        <button
                            type="button"
                            onClick={() => {
                                // reset minimal state to allow another submission
                                setStep(1);
                                setTicketCount(1);
                                setName("");
                                setEmail("");
                                setStartupName("");
                                setPhone("");
                                setFile(null);
                                setError(null);
                            }}
                            className="px-4 py-2 rounded-md border border-gray-600 text-white hover:bg-gray-800"
                        >
                            Register another
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};
