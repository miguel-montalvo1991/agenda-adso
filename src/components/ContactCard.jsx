function ContactCard({ nombre, telefono, email }) {
  return (
    <div>
      <h3>{nombre}</h3>
      <p>Tel: {telefono}</p>
      <p>Email: {email}</p>
    </div>
  );
}

export default ContactCard;
