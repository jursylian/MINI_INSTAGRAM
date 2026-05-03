export const isDemoPost = (post) => {
  const id = post?._id || post?.id;
  return typeof id === "string" && id.startsWith("demo");
};

export const defaultPosts = [
  {
    _id: "demo-1",
    authorId: {
      _id: "demo-user-1",
      username: "demo_user",
      avatar: "https://i.pravatar.cc/150?img=32",
    },
    image: "https://picsum.photos/seed/ichgram-demo-1/800/800",
    caption: "Weekend views and fresh air.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-01T10:00:00.000Z",
  },
  {
    _id: "demo-2",
    authorId: {
      _id: "demo-user-2",
      username: "city_frames",
      avatar: "https://i.pravatar.cc/150?img=5",
    },
    image: "https://picsum.photos/seed/urban-cafe-2/800/800",
    caption: "A different perspective today.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-02T09:30:00.000Z",
  },
  {
    _id: "demo-3",
    authorId: {
      _id: "demo-user-3",
      username: "slow_mornings",
      avatar: "https://i.pravatar.cc/150?img=20",
    },
    image: "https://picsum.photos/seed/cozy-barista-3/800/800",
    caption: "Slow mornings, steady energy.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-03T17:45:00.000Z",
  },
  {
    _id: "demo-4",
    authorId: {
      _id: "demo-user-4",
      username: "sea_breeze",
      avatar: "https://i.pravatar.cc/150?img=12",
    },
    image: "https://picsum.photos/seed/ichgram-demo-4/800/800",
    caption: "Some moments speak for themselves.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-04T12:15:00.000Z",
  },
  {
    _id: "demo-5",
    authorId: {
      _id: "demo-user-5",
      username: "wild_coast",
      avatar: "https://i.pravatar.cc/150?img=15",
    },
    image: "https://picsum.photos/seed/ichgram-demo-5/800/800",
    caption: "Fresh air, clear thoughts.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-05T21:20:00.000Z",
  },
  {
    _id: "demo-6",
    authorId: {
      _id: "demo-user-6",
      username: "quiet_paths",
      avatar: "https://i.pravatar.cc/150?img=24",
    },
    image: "https://picsum.photos/seed/ichgram-demo-77/800/800",
    caption: "A new view, a new direction.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-06T08:10:00.000Z",
  },
  {
    _id: "demo-7",
    authorId: {
      _id: "demo-user-7",
      username: "autumn_light",
      avatar: "https://i.pravatar.cc/150?img=29",
    },
    image: "https://picsum.photos/seed/ichgram-demo-7/800/800",
    caption: "Seasonal colors everywhere.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-07T14:35:00.000Z",
  },
  {
    _id: "demo-8",
    authorId: {
      _id: "demo-user-8",
      username: "soft_views",
      avatar: "https://i.pravatar.cc/150?img=41",
    },
    image: "https://picsum.photos/seed/ichgram-demo-8/800/800",
    caption: "Quiet moments, softer light.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-08T11:05:00.000Z",
  },
  {
    _id: "demo-9",
    authorId: {
      _id: "demo-user-9",
      username: "walking_notes",
      avatar: "https://i.pravatar.cc/150?img=47",
    },
    image: "https://picsum.photos/seed/ichgram-demo-9/800/800",
    caption: "Moving forward.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-09T16:25:00.000Z",
  },
  {
    _id: "demo-10",
    authorId: {
      _id: "demo-user-10",
      username: "open_tracks",
      avatar: "https://i.pravatar.cc/150?img=56",
    },
    image: "https://picsum.photos/seed/ichgram-demo-10/800/800",
    caption: "Every path leads somewhere.",
    likesCount: 0,
    liked: false,
    createdAt: "2026-05-10T10:00:00.000Z",
  },
];
