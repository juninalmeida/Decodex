function UserIcon() {
  return (
    <svg
      className="icon icon--user"
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect
        x="3"
        y="2"
        width="18"
        height="20"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.2"
      />
      <circle cx="12" cy="9" r="3" stroke="currentColor" strokeWidth="1.2" />
      <path
        d="M7 19C7 16.2386 9.23858 14 12 14C14.7614 14 17 16.2386 17 19"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      <line
        className="icon__scan-line"
        x1="4"
        y1="4"
        x2="20"
        y2="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <rect
        x="3"
        y="2"
        width="2"
        height="2"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="19"
        y="2"
        width="2"
        height="2"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="3"
        y="20"
        width="2"
        height="2"
        fill="currentColor"
        opacity="0.3"
      />
      <rect
        x="19"
        y="20"
        width="2"
        height="2"
        fill="currentColor"
        opacity="0.3"
      />
    </svg>
  )
}

export default UserIcon
