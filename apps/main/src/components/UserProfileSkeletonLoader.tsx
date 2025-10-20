import { Skeleton, Box } from "@mui/material";

export default function UserProfileSkeletonLoader() {
  return (
    <Box sx={{ backgroundColor: "#F9F6F8", minHeight: "100vh", pb: 10 }}>
      {/* Breadcrumbs Skeleton */}
      <Box sx={{ px: 4, py: 2 }}>
        <Skeleton variant="text" width={200} height={24} />
      </Box>

      {/* Header Skeleton */}
      <Box
        sx={{
          mb: 4,
          backgroundColor: "white",
          px: 4,
          py: 3,
          boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Skeleton variant="text" width={250} height={40} />
            <Skeleton
              variant="rectangular"
              width={60}
              height={24}
              sx={{ borderRadius: 4 }}
            />
          </Box>
          <Skeleton
            variant="rectangular"
            width={40}
            height={40}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        <Skeleton variant="text" width={150} height={20} sx={{ mt: 1 }} />
      </Box>

      {/* Tabs Skeleton */}
      <Box sx={{ backgroundColor: "white", px: 4 }}>
        <Box
          sx={{ display: "flex", gap: 3, borderBottom: "3px solid #E5E7EB" }}
        >
          <Skeleton variant="text" width={120} height={48} />
          <Skeleton variant="text" width={120} height={48} />
        </Box>
      </Box>

      {/* Content Skeleton */}
      <Box sx={{ p: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {/* Basic Information Card */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 3,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Skeleton variant="text" width={150} height={28} sx={{ mb: 3 }} />
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 3,
              }}
            >
              {Array.from({ length: 6 }).map((_, index) => (
                <Box key={`basic-${index}`}>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton
                    variant="text"
                    width={150}
                    height={24}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Contact Information Card */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 3,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}
            >
              <Skeleton variant="text" width={150} height={28} />
              <Skeleton variant="text" width={50} height={24} />
            </Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: 3,
              }}
            >
              {Array.from({ length: 3 }).map((_, index) => (
                <Box key={`contact-${index}`}>
                  <Skeleton variant="text" width={100} height={20} />
                  <Skeleton
                    variant="text"
                    width={150}
                    height={24}
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ))}
            </Box>
          </Box>

          {/* Role Permission Card */}
          <Box
            sx={{
              backgroundColor: "white",
              borderRadius: "12px",
              p: 3,
              boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Skeleton variant="text" width={180} height={28} sx={{ mb: 3 }} />
            <Skeleton variant="text" width={120} height={24} sx={{ mb: 2 }} />
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
              {Array.from({ length: 8 }).map((_, index) => (
                <Skeleton
                  key={`permission-${index}`}
                  variant="rectangular"
                  width={120}
                  height={28}
                  sx={{ borderRadius: 2 }}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
