import { useEffect, useState } from "react";
import { UploadAvatar } from "../../compents/UploadAvatar";
//import { fetchCurrentUser, updateCurrentUserProfile } from "../../services/auth";

// const initialProfile = {
//     _id: "6a6d0af2ab1e591eff10bf40",
//     name: "João da Silva",
//     email: "joao.silva@example.com",
//     avatar: "1785603468180.jpg",
//     bio: "Desenvolvedor Full Stack apaixonado por tecnologia.",
// };

export function ProfilePage() {
    const [profile, setProfile] = useState({
        _id: "",
        name: "",
        email: "",
        avatar: "",
        bio: "",
    });
    const [saved, setSaved] = useState(false);
    const [saving, setSaving] = useState(false);
    const [avatarFile, setAvatarFile] = useState(null);
    const [feedbackMessage, setFeedbackMessage] = useState("");

    useEffect(() => {
        let mounted = true;

        // void fetchCurrentUser().then((user) => {
        //     if (!mounted || !user) return;
        //     setProfile((prev) => ({
        //         ...prev,
        //         ...user,
        //     }));
        // });

        return () => {
            mounted = false;
        };
    }, []);

    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState("");

    useEffect(() => {
        if (!avatarFile) {
            setAvatarPreviewUrl("");
            return;
        }

        const objectUrl = URL.createObjectURL(avatarFile);
        setAvatarPreviewUrl(objectUrl);

        return () => {
            URL.revokeObjectURL(objectUrl);
        };
    }, [avatarFile]);

    function handleChange(event) {
        const { name, value } = event.target;
        setSaved(false);
        setFeedbackMessage("");
        setProfile((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    function handleFileChange(event) {
        const file = event.target.files?.[0];
        if (!file) return;

        setSaved(false);
        setFeedbackMessage("");
        setAvatarFile(file);
    }

    function handleRemoveImage() {
        setSaved(false);
        setFeedbackMessage("");
        setAvatarFile(null);
        setProfile((prev) => ({
            ...prev,
            avatar: "",
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setSaving(true);
        setFeedbackMessage("");

        try {
            // const response = await updateCurrentUserProfile({
            //     id: profile._id,
            //     name: profile.name,
            //     email: profile.email,
            //     bio: profile.bio,
            //     avatarFile,
            //     avatar: profile.avatar,
            // });

            const updatedUser = response?.user;
            if (updatedUser) {
                setProfile((prev) => ({
                    ...prev,
                    ...updatedUser,
                }));
            }

            setAvatarFile(null);
            setSaved(true);
            setFeedbackMessage("Perfil atualizado com sucesso.");
        } catch (error) {
            setSaved(false);
            setFeedbackMessage(
                error?.response?.data?.message || "Não foi possível salvar as alterações."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <section className="w-full max-w-5xl  p-6">
            <header className="mb-6 border-b border-primary-100 pb-4">
                <h1 className="text-2xl font-black text-primary-900">Configurar Perfil</h1>
                <p className="mt-1 text-sm text-secondary-gray">
                    Atualize seus dados principais e personalize sua página pública.
                </p>
            </header>

            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_290px]">
                <div className="space-y-4">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-primary-900">Nome</label>
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleChange}
                            className="h-11 w-full rounded-lg border border-secondary-lightGray bg-secondary-white px-3 text-sm text-secondary-black focus:border-primary-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-primary-900">E-mail</label>
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleChange}
                            className="h-11 w-full rounded-lg border border-secondary-lightGray bg-secondary-white px-3 text-sm text-secondary-black focus:border-primary-500 focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="mb-1 block text-sm font-semibold text-primary-900">Bio</label>
                        <textarea
                            name="bio"
                            rows={6}
                            value={profile.bio}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-secondary-lightGray bg-secondary-white px-3 py-2 text-sm text-secondary-black focus:border-primary-500 focus:outline-none"
                        />
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                        <p className={`text-sm ${saved ? "font-medium text-secondary-green" : "text-secondary-gray"}`}>
                            {feedbackMessage || "Nenhuma alteração salva ainda."}
                        </p>

                        <button
                            type="submit"
                            disabled={saving}
                            className="h-11 rounded-xl bg-primary-900 px-5 text-sm font-bold text-secondary-white transition-colors hover:bg-primary-700"
                        >
                            {saving ? "Salvando..." : "Salvar alterações"}
                        </button>
                    </div>
                </div>

                <UploadAvatar
                    avatar={profile.avatar}
                    previewUrl={avatarPreviewUrl}
                    onFileChange={handleFileChange}
                    onRemoveImage={handleRemoveImage}
                    className="lg:sticky lg:top-20"
                />
            </form>
        </section>
    );
}