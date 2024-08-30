export function Button({ children, ...props }) {
    return (
      <button {...props} style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: '#fff', border: 'none', borderRadius: '5px' }}>
        {children}
      </button>
    );
  }
  