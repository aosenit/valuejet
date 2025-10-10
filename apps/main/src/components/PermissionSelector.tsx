import React, { useState } from "react";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Collapse,
  Typography,
} from "@mui/material";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Permission {
  id: string;
  name: string;
  subPermissions?: Permission[];
}

interface PermissionSelectorProps {
  permissions: Permission[];
  selectedPermissions: string[];
  onPermissionChange: (permissionIds: string[]) => void;
}

const PermissionSelector: React.FC<PermissionSelectorProps> = ({
  permissions,
  selectedPermissions,
  onPermissionChange,
}) => {
  const [expandedPermissions, setExpandedPermissions] = useState<string[]>([]);

  const handlePermissionToggle = (permissionId: string) => {
    const isSelected = selectedPermissions.includes(permissionId);
    if (isSelected) {
      onPermissionChange(
        selectedPermissions.filter((id) => id !== permissionId)
      );
    } else {
      onPermissionChange([...selectedPermissions, permissionId]);
    }
  };

  const handleSubPermissionToggle = (
    parentId: string,
    subPermissionId: string
  ) => {
    const parentPermission = permissions.find((p) => p.id === parentId);
    if (!parentPermission?.subPermissions) return;

    const currentSubPermissions = selectedPermissions.filter((id) =>
      parentPermission.subPermissions?.some((sub) => sub.id === id)
    );

    const isSubSelected = currentSubPermissions.includes(subPermissionId);
    let newSubPermissions: string[];

    if (isSubSelected) {
      newSubPermissions = currentSubPermissions.filter(
        (id) => id !== subPermissionId
      );
    } else {
      newSubPermissions = [...currentSubPermissions, subPermissionId];
    }

    // Remove parent permission if it was selected
    const filteredPermissions = selectedPermissions.filter(
      (id) => id !== parentId
    );

    // Add all sub-permissions
    onPermissionChange([...filteredPermissions, ...newSubPermissions]);
  };

  const toggleExpanded = (permissionId: string) => {
    setExpandedPermissions((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId]
    );
  };

  const isParentSelected = (permission: Permission) => {
    if (!permission.subPermissions) {
      return selectedPermissions.includes(permission.id);
    }
    return permission.subPermissions.every((sub) =>
      selectedPermissions.includes(sub.id)
    );
  };

  const renderPermission = (permission: Permission, level: number = 0) => {
    const hasSubPermissions =
      permission.subPermissions && permission.subPermissions.length > 0;
    const isExpanded = expandedPermissions.includes(permission.id);
    const isSelected = isParentSelected(permission);

    return (
      <Box key={permission.id} sx={{ ml: level * 2 }}>
        <Box
          sx={{ display: "flex", alignItems: "center", py: 1 }}
          className="rounded-md p-2 w-full border-b border-[#D0D5DD]"
        >
          <FormControlLabel
            className="rounded-md p-2 w-full"
            control={
              <Checkbox
                checked={isSelected}
                onChange={() => handlePermissionToggle(permission.id)}
                sx={{
                  color: "#AD3291",
                  "&.Mui-checked": {
                    color: "#AD3291",
                  },
                }}
              />
            }
            label={
              <Typography
                variant="body2"
                sx={{ fontWeight: 500, color: "#101828" }}
              >
                {permission.name}
              </Typography>
            }
            sx={{ margin: 0 }}
          />
          {hasSubPermissions && (
            <Box
              sx={{ cursor: "pointer", ml: 1 }}
              onClick={() => toggleExpanded(permission.id)}
            >
              {isExpanded ? (
                <ChevronUp size={16} color="#667085" />
              ) : (
                <ChevronDown size={16} color="#667085" />
              )}
            </Box>
          )}
        </Box>

        {hasSubPermissions && (
          <Collapse in={isExpanded}>
            <Box sx={{ ml: 4 }}>
              {permission.subPermissions?.map((subPermission) => (
                <Box
                  key={subPermission.id}
                  sx={{ display: "flex", alignItems: "center", py: 0.5 }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={selectedPermissions.includes(subPermission.id)}
                        onChange={() =>
                          handleSubPermissionToggle(
                            permission.id,
                            subPermission.id
                          )
                        }
                        sx={{
                          color: "#AD3291",
                          "&.Mui-checked": {
                            color: "#AD3291",
                          },
                        }}
                      />
                    }
                    label={
                      <Typography variant="body2" sx={{ color: "#667085" }}>
                        {subPermission.name}
                      </Typography>
                    }
                    sx={{ margin: 0 }}
                  />
                </Box>
              ))}
            </Box>
          </Collapse>
        )}
      </Box>
    );
  };

  return (
    <Box sx={{ border: "1px solid #E5E7EB", borderRadius: "8px", p: 2 }}>
      {permissions.map((permission) => renderPermission(permission))}
    </Box>
  );
};

export default PermissionSelector;
