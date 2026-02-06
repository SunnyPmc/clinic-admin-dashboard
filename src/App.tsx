import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/AuthPages/SignIn";
import NotFound from "./pages/OtherPage/NotFound";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import CreateBlog from "./pages/Forms/CreateBlog";
import CreateTherapyMaterial from "./pages/Forms/TherapyMaterials";
import CreateCarouselImage from "./pages/Forms/CreateCarouselImage";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import CreateTestimonial from "./pages/Forms/CreateTestimonial";
import BlogTable from "./pages/Tables/Blogs";
import TestimonialsTable from "./pages/Tables/Testimonials";
import TherapyMaterialsTable from "./pages/Tables/TherapyMaterials";
import CarouselImageTable from "./pages/Tables/CarouselImgTable";

import RequireAuth from "./routes/RequireAuth";
import PublicOnly from "./routes/PublicOnly";

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>

        {/* Root: decide based on auth */}
        <Route
          path="/"
          element={
            localStorage.getItem("token")
              ? <Navigate to="/admin/dashboard" replace />
              : <Navigate to="/signin" replace />
          }
        />

        {/* Signin (only if NOT logged in) */}
        <Route
          path="/signin"
          element={
            <PublicOnly>
              <SignIn />
            </PublicOnly>
          }
        />

        {/* Protected Dashboard */}
        <Route
          element={
            <RequireAuth>
              <AppLayout />
            </RequireAuth>
          }
        >
          <Route path="/admin/dashboard" element={<Home />} />

          {/* Forms */}
          <Route path="/create-blog" element={<CreateBlog />} />
          <Route path="/create-therapy-materials" element={<CreateTherapyMaterial />} />
          <Route path="/create-testimonial" element={<CreateTestimonial />} />
          <Route path="/create-carousel-image" element={<CreateCarouselImage />} />

          {/* Tables */}
          <Route path="/tables/blogs" element={<BlogTable />} />
          <Route path="/tables/testimonials" element={<TestimonialsTable />} />
          <Route path="/tables/therapy-materials" element={<TherapyMaterialsTable />} />
          <Route path="/tables/carousel-Images" element={<CarouselImageTable />} />

          {/* Charts */}
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}