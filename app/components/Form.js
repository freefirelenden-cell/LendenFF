import React, { useContext } from 'react'
import UploadImage from './UploadImage'
import LoadingSpinner from './ui/LoadingSpinner';
import Progress from './ui/Progress';
import { myContext } from '../context/context';




export default function Form({
    form, setForm, handleSubmit,
    name, tempImages, setTempImages, submiting,
    setToDeleteImages, progress
}) {
    const { isLoaded, user } = useContext(myContext)


    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    if (!isLoaded && !user?.id) {
        return <LoadingSpinner size="xl" showText={true} />
    }

    return (
        <section className="min-h-screen bg-[var(--color-bg)] text-[var(--color-text)] py-16 px-4">
            <div className="max-w-3xl mx-auto border border-[var(--color-border)] rounded-2xl shadow-lg p-8 bg-[var(--color-bg)]">
                <h1 className="text-3xl font-bold text-[var(--color-brand-yellow)] mb-6 text-center">
                    {name}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Account Title</label>
                        <input
                            type="text"
                            name="title"
                            value={form.title}
                            onChange={handleChange}
                            placeholder="e.g. Level 75 • 15 Elite Passes • 300+ Skins"
                            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                            required
                        />
                    </div>

                    {/* Rank & Price */}
                    <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">Rank</label>
                            <select
                                name="rank"
                                value={form.rank}
                                onChange={handleChange}
                                className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none"
                                required
                            >
                                <option value="">Select Rank</option>
                                <option>Bronze</option>
                                <option>Silver</option>
                                <option>Gold</option>
                                <option>Platinum</option>
                                <option>Diamond</option>
                                <option>Heroic</option>
                                <option>Grandmaster</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold mb-2">Price (PKR)</label>
                            <input
                                type="number"
                                name="price"
                                value={form.price}
                                onChange={handleChange}
                                placeholder="e.g. 2999"
                                className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                                required
                            />
                        </div>
                    </div>

                    {/* UID, Email, Password */}
                    <div className="grid sm:grid-cols-3 gap-6">
                        <div>
                            <label className="block text-sm font-semibold mb-2">UID</label>
                            <input
                                type="text"
                                name="uid"
                                value={form.uid}
                                onChange={handleChange}
                                placeholder="e.g. 123456789"
                                className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Account Gmail</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="e.g. yourmail@gmail.com"
                                className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold mb-2">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="Account password"
                                className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                            />
                            <p className="text-xs text-[var(--color-text-secondary)] mt-1">
                                (Optional — can provide after sale)
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">Description</label>
                        <textarea
                            name="description"
                            value={form.description}
                            onChange={handleChange}
                            rows="4"
                            placeholder="Describe account details like skins, passes, bundles..."
                            className="w-full p-3 rounded-lg border border-[var(--color-border)] bg-transparent focus:outline-none focus:border-[var(--color-brand-yellow)]"
                            required
                        ></textarea>
                    </div>

                    {/* Stats */}
                    <div className="grid sm:grid-cols-4 gap-4">
                        <Input label="Level" name="level" value={form.stats.level} onChange={handleChange} />
                        <Input label="Matches" name="matches" value={form.stats.matches} onChange={handleChange} />
                        <Input label="K/D Ratio" name="kdr" value={form.stats.kdr} onChange={handleChange} />
                        <Input label="Badges" name="badges" value={form.stats.badges} onChange={handleChange} />
                    </div>

                    {/* Upload images */}
                    <div>
                        <label className="block text-sm font-semibold mb-2">
                            Upload Account Images (max 3)
                        </label>
                        <UploadImage
                            tempImages={tempImages}
                            setTempImages={setTempImages}
                            setToDeleteImages={setToDeleteImages} />
                    </div>

                    {/* Submit */}
                    {!submiting ?
                        <button
                            type="submit"
                            disabled={submiting}
                            className="w-full mt-6 bg-[var(--color-brand-yellow)] text-black py-3 rounded-xl font-semibold hover:bg-[var(--color-brand-gold)] transition"
                        >
                            Submit Your Account
                        </button> :
                        //  <LoadingSpinner size="md" showText={true} text={`${progress}%`} />
                        <Progress
                            size="md"
                            showText={true}
                            text="Loading..."
                            progress={progress}
                            className="mb-4"
                        />
                    }
                </form>

                <p className="text-xs text-center text-[var(--color-text-secondary)] mt-6">
                    🔒 Your Gmail and password will be stored securely and verified manually by the admin team before listing.
                </p>
            </div>
        </section>
    )
}



// 🔹 Small reusable input component
function Input({ label, name, value, onChange }) {
    return (
        <div>
            <label className="block text-sm font-semibold mb-2">{label}</label>
            <input
                type="text"
                name={name}
                value={value || ""}
                onChange={onChange}
                className="w-full p-2 rounded-lg border border-[var(--color-border)] bg-transparent"
            />
        </div>
    );
}
