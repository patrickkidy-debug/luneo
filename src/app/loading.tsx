export default function Loading() {
  return (
    <div className="container-luneo flex min-h-[50vh] items-center justify-center py-20">
      <div className="flex flex-col items-center gap-3">
        <span className="h-8 w-8 animate-spin rounded-full border-2 border-luneo-gray-border border-t-luneo-red" />
        <p className="text-sm text-black/50">Chargement...</p>
      </div>
    </div>
  );
}
