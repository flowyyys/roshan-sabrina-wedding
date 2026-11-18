export function InvitationAtmosphere() {
  return (
    <div className="scene-subpage-sparkles" aria-hidden="true">
      {Array.from({ length: 12 }, (_, index) => (
        <span key={index} style={{ left: `${(index * 37 + 9) % 100}%`, top: `${(index * 23 + 13) % 100}%`, animationDelay: `${index * -.7}s`, animationDuration: `${5 + index % 5}s` }} />
      ))}
    </div>
  );
}
