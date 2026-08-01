const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

function resolveAvatarUrl(avatar) {
  if (!avatar) return "";
  if (avatar.startsWith("http://") || avatar.startsWith("https://")) return avatar;
  return `${API_BASE_URL}/images/users/${avatar}`;
}

export function UploadAvatar({ avatar, previewUrl, onFileChange, onRemoveImage }) {
  const imageSrc = previewUrl || resolveAvatarUrl(avatar);

  return (
    <div className="md:col-span-2">
      <label className="mb-2 block text-sm font-semibold text-primary-900">Foto de perfil</label>

      <div className="flex items-center gap-4">
        <div className="h-20 w-20 overflow-hidden rounded-full border-2 border-primary-200 bg-secondary-white">
          {imageSrc ? (
            <img src={imageSrc} alt="Avatar do perfil" className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-xs text-secondary-gray">
              Sem foto
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <label className="inline-flex h-10 cursor-pointer items-center rounded-lg bg-primary-900 px-4 text-sm font-semibold text-secondary-white transition-colors hover:bg-primary-700">
            Alterar imagem
            <input
              type="file"
              accept="image/png,image/jpg,image/jpeg"
              className="hidden"
              onChange={onFileChange}
            />
          </label>

          {imageSrc && (
            <button
              type="button"
              onClick={onRemoveImage}
              className="inline-flex h-10 items-center rounded-lg border border-secondary-lightGray px-4 text-sm font-semibold text-secondary-gray transition-colors hover:border-secondary-red hover:text-secondary-red"
            >
              Remover
            </button>
          )}
        </div>
      </div>

      <p className="mt-2 text-xs text-secondary-gray">Formatos aceitos: JPG, JPEG e PNG.</p>
    </div>
  );
}
