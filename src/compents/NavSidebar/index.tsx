export function NaviSidebar() {
    return (
        <aside className="fixed left-0 top-14 z-30 h-screen w-14 bg-primary-900 text-secondary-white shadow-lg">
            <div className="flex h-full flex-col items-center justify-end gap-4 py-4">
                <div className="h-10 w-10 rounded-full bg-secondary-white/10" />
                <div className="h-10 w-10 rounded-full bg-secondary-white/10" />
                <div className="h-10 w-10 rounded-full bg-secondary-white/10" />
            </div>
        </aside>
    );
}