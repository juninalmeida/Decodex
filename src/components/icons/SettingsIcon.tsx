function SettingsIcon() {
  return (
    <svg
      className="icon icon--settings"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M12 15.5C13.933 15.5 15.5 13.933 15.5 12C15.5 10.067 13.933 8.5 12 8.5C10.067 8.5 8.5 10.067 8.5 12C8.5 13.933 10.067 15.5 12 15.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <path
        d="M12 1L14.5 4H19.5L22 8L19.5 12L22 16L19.5 20H14.5L12 23L9.5 20H4.5L2 16L4.5 12L2 8L4.5 4H9.5L12 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.4" />
      <line
        x1="12"
        y1="5"
        x2="12"
        y2="8"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="12"
        y1="16"
        x2="12"
        y2="19"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="5"
        y1="12"
        x2="8"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
      <line
        x1="16"
        y1="12"
        x2="19"
        y2="12"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.3"
      />
    </svg>
  )
}

export default SettingsIcon
