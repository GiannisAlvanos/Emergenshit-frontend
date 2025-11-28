import api from "./api";

const AdminAPI = {
  getPending: () => api.get("/admin/pending"),
  approve: (id) => api.put(`/admin/approve/${id}`),
  reject: (id) => api.put(`/admin/reject/${id}`),
};

export default AdminAPI;
