export function Button({ children, ...props }) {
    return (
      <button {...props} style={{ padding: '10px 20px', backgroundColor: '#000000', color: '#fff', border: 'none', borderRadius: '5px' }}>
        {children}
      </button>
    );
  }
  