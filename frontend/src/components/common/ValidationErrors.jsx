export default function ValidationErrors({ errors, field }) {
  if (!errors?.[field]) return null;
  return errors?.[field]?.map()((error, index) => (
    <p key={index} className="mt-1 text-sm text-red-600">
      {error}
    </p>
  ));
}
