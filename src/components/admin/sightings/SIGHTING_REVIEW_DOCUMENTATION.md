# Sighting Review Feature - Documentation

## Overview

The Sighting Review feature is a comprehensive admin panel module that allows administrators to review, approve, or reject wildlife sightings submitted by users. This feature follows best practices including modularization, Redux state management, TanStack Query for data fetching, and a clean separation of concerns.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Data Flow](#data-flow)
4. [Component Breakdown](#component-breakdown)
5. [State Management](#state-management)
6. [API Integration](#api-integration)
7. [Key Features](#key-features)
8. [Usage Guide](#usage-guide)

---

## Architecture Overview

The feature follows a **modular architecture** with clear separation between:

- **State Management**: Redux Toolkit for UI state and filters
- **Data Fetching**: TanStack Query for server state and caching
- **Components**: Modular, reusable components with single responsibilities
- **API Layer**: Centralized API functions with proper error handling

### Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        User Interface                           │
│                    (AdminSightings Page)                        │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────────┐
│                   SightingReview Component                      │
│  ┌──────────────┐  ┌──────────────┐  ┌────────────────────┐     │
│  │  FilterBar   │  │SightingsTable│  │    Modals          │     │
│  └──────────────┘  └──────────────┘  │  - Detail Modal    │     │
│  ┌──────────────┐  ┌──────────────┐  │  - Reject Modal    │     │
│  │  Pagination  │  │  Stats Cards │  └────────────────────┘     │
│  └──────────────┘  └──────────────┘                             │
└───────┬─────────────────────────────────────┬───────────────── ─┘
        │                                     │
        ▼                                     ▼
┌──────────────────┐              ┌─────────────────────────┐
│  Redux Store     │              │   TanStack Query        │
│  ┌────────────┐  │              │   ┌─────────────────┐   │
│  │  Filters   │  │              │   │ useSightings    │   │
│  │  UI State  │  │◄────────────►│   │ useApprove      │   │
│  │ Pagination │  │              │   │ useReject       │   │
│  └────────────┘  │              │   │ useDelete       │   │
└──────────────────┘              │   └─────────────────┘   │
                                  └──────────┬──────────────┘
                                             │
                                             ▼
                                  ┌──────────────────────┐
                                  │    API Layer         │
                                  │  ┌────────────────┐  │
                                  │  │ getAllSightings│  │
                                  │  │ approveSighting│  │
                                  │  │ rejectSighting │  │
                                  │  │ deleteSighting │  │
                                  │  └────────────────┘  │
                                  └──────────┬───────────┘
                                             │
                                             ▼
                                  ┌──────────────────────┐
                                  │   Backend API        │
                                  │   (Express Server)   │
                                  └──────────────────────┘
```

---

## File Structure

```
src/
├── api/
│   └── sightings.js                    # API functions for sighting operations
│
├── store/
│   ├── store.js                        # Redux store configuration
│   └── slices/
│       └── sightingReviewSlice.ts      # Redux slice for sighting review state
│
├── hooks/
│   └── useSightingReview.ts            # TanStack Query hooks for data fetching
│
├── components/
│   └── admin/
│       └── sightings/
│           ├── SightingReview.tsx      # Main component (orchestrator)
│           ├── index.ts                # Barrel export
│           └── components/
│               ├── FilterBar.tsx       # Search and filter controls
│               ├── SightingsTable.tsx  # Table display with actions
│               ├── Pagination.tsx      # Pagination controls
│               ├── SightingDetailModal.tsx  # Detailed view modal
│               ├── RejectModal.tsx     # Rejection reason modal
│               └── index.ts            # Barrel export
│
└── pages/
    └── admin/
        └── AdminSightings.tsx          # Page wrapper component
```

### File Responsibilities

| File | Purpose | Dependencies |
|------|---------|--------------|
| `sightings.js` | API calls to backend | axios, firebase |
| `sightingReviewSlice.ts` | Redux state management | @reduxjs/toolkit |
| `useSightingReview.ts` | TanStack Query hooks | @tanstack/react-query |
| `SightingReview.tsx` | Main orchestrator | Redux, hooks, child components |
| `FilterBar.tsx` | Filter UI component | React |
| `SightingsTable.tsx` | Table display | lucide-react, date-fns |
| `Pagination.tsx` | Pagination UI | React |
| `SightingDetailModal.tsx` | Detail view modal | TanStack Query hooks |
| `RejectModal.tsx` | Rejection form | React |
| `AdminSightings.tsx` | Page entry point | SightingReview component |

---

## Data Flow

### 1. Initial Load Flow

```
User navigates to /admin/sightings
         │
         ▼
AdminSightings Page loads
         │
         ▼
SightingReview component mounts
         │
         ├─► Redux: Get initial filter/pagination state
         │
         └─► TanStack Query: Fetch sightings with params
                    │
                    ▼
             API Call: getAllSightings(params)
                    │
                    ▼
             Backend returns data
                    │
                    ▼
             Query cache updated
                    │
                    ▼
             Component re-renders with data
```

### 2. Filter Change Flow

```
User changes filter (e.g., status)
         │
         ▼
Dispatch Redux action: setStatusFilter()
         │
         ▼
Redux updates filter state
         │
         ▼
Component re-renders (filter changed)
         │
         ▼
useMemo recalculates queryParams
         │
         ▼
TanStack Query detects new queryKey
         │
         ▼
Automatic refetch with new params
         │
         ▼
Table updates with filtered data
```

### 3. Approve Sighting Flow

```
User clicks "Approve" button
         │
         ▼
SightingsTable calls onApprove(id)
         │
         ▼
SightingReview calls handleApprove(id)
         │
         ▼
useApproveSighting mutation executes
         │
         ├─► onMutate: Show loading toast
         │
         ├─► mutationFn: approveSighting(id) API call
         │        │
         │        ▼
         │   Backend approves sighting
         │        │
         │        ▼
         │   Success response
         │
         ├─► onSuccess:
         │      ├─ Invalidate query cache
         │      ├─ Refetch sighting lists
         │      └─ Show success toast
         │
         └─► onError: Show error toast
```

### 4. Reject Sighting Flow

```
User clicks "Reject" button
         │
         ▼
SightingsTable calls onReject(id)
         │
         ▼
Dispatch: initializeRejectSighting(id)
         │
         ├─► Set selectedSightingId
         └─► Open reject modal
         │
         ▼
RejectModal displays
         │
         ▼
User enters reason and confirms
         │
         ▼
handleConfirmReject(reason) called
         │
         ▼
useRejectSighting mutation executes
         │
         ├─► onMutate: Show loading toast
         │
         ├─► mutationFn: rejectSighting(id, reason)
         │        │
         │        ▼
         │   Backend rejects sighting
         │        │
         │        ▼
         │   Success response
         │
         ├─► onSuccess:
         │      ├─ Invalidate query cache
         │      ├─ Refetch sighting lists
         │      ├─ Close modal
         │      └─ Show success toast
         │
         └─► onError: Show error toast
```

### 5. Pagination Flow

```
User clicks page number
         │
         ▼
Pagination calls onPageChange(pageNum)
         │
         ▼
Dispatch: setPage(pageNum)
         │
         ▼
Redux updates pagination.page
         │
         ▼
Component re-renders
         │
         ▼
useMemo recalculates queryParams
         │
         ▼
TanStack Query refetches with new page
         │
         └─► placeholderData keeps old data visible
                    │
                    ▼
             New data arrives
                    │
                    ▼
             Smooth transition to new page
```

---

## Component Breakdown

### 1. **SightingReview.tsx** (Main Orchestrator)

**Responsibilities:**
- Connect Redux state to UI
- Fetch data using TanStack Query hooks
- Coordinate child components
- Handle user actions (approve, reject, delete)
- Display stats cards

**Key Props/State:**
- Redux: filters, pagination, ui state
- Query: sightings data, loading, error states
- Mutations: approve, reject, delete

**Code Pattern:**
```tsx
const SightingReview = () => {
  // 1. Redux selectors
  const filters = useSelector(state => state.sightingReview.filters);
  
  // 2. Build query params
  const queryParams = useMemo(() => buildParams(filters), [filters]);
  
  // 3. Fetch data
  const { data, isLoading } = useSightings(queryParams);
  
  // 4. Mutations
  const approve = useApproveSighting();
  
  // 5. Event handlers
  const handleApprove = (id) => approve.mutate(id);
  
  // 6. Render child components
  return <FilterBar /><SightingsTable />...
};
```

### 2. **FilterBar.tsx**

**Responsibilities:**
- Display search input
- Render filter dropdowns (status, species)
- Date range selection
- Reset filters button

**Props Interface:**
```tsx
interface FilterBarProps {
  filters: { search, status, speciesId, startDate, endDate };
  onSearchChange: (value: string) => void;
  onStatusChange: (status: SightingStatus) => void;
  onSpeciesChange: (id: string) => void;
  onDateRangeChange: (start: string, end: string) => void;
  onResetFilters: () => void;
  speciesList?: Array<{ id, commonName }>;
}
```

### 3. **SightingsTable.tsx**

**Responsibilities:**
- Display sightings in table format
- Show loading skeleton
- Empty state handling
- Action buttons (approve, reject, view, delete)
- Dropdown menu for additional actions

**Props Interface:**
```tsx
interface SightingsTableProps {
  sightings: Sighting[];
  onViewDetails: (id: string) => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onDelete: (id: string) => void;
  activeDropdown: string | null;
  onToggleDropdown: (id: string | null) => void;
  isLoading?: boolean;
}
```

### 4. **Pagination.tsx**

**Responsibilities:**
- Display page numbers with smart ellipsis
- Items per page selector
- Next/Previous buttons
- Show current range (e.g., "Showing 1 to 10 of 50")

**Props Interface:**
```tsx
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (limit: number) => void;
}
```

### 5. **SightingDetailModal.tsx**

**Responsibilities:**
- Fetch detailed sighting data
- Display photos in grid
- Show all sighting metadata
- Action buttons for pending sightings
- Modal overlay and backdrop

**Features:**
- Automatic data fetching when opened
- Loading skeleton
- Photo gallery
- Formatted dates and coordinates
- Status badge

### 6. **RejectModal.tsx**

**Responsibilities:**
- Collect rejection reason
- Provide common rejection templates
- Validation (reason required)
- Confirmation workflow

**Features:**
- Quick-select common reasons
- Custom reason textarea
- Client-side validation
- Warning message about user notification

---

## State Management

### Redux Slice Structure

```typescript
interface SightingReviewState {
  filters: {
    search: string;
    status: 'pending' | 'verified' | 'rejected' | 'all';
    speciesId: string;
    startDate: string;
    endDate: string;
  };
  pagination: {
    page: number;
    limit: number;
  };
  ui: {
    isDetailModalOpen: boolean;
    isRejectModalOpen: boolean;
    activeDropdown: string | null;
  };
  selectedSightingId: string | null;
}
```

### Available Actions

| Action | Purpose | Side Effects |
|--------|---------|--------------|
| `setSearch` | Update search query | Reset to page 1 |
| `setStatusFilter` | Filter by status | Reset to page 1 |
| `setSpeciesFilter` | Filter by species | Reset to page 1 |
| `setDateRange` | Set date range filter | Reset to page 1 |
| `resetFilters` | Clear all filters | Reset to page 1 |
| `setPage` | Change current page | None |
| `setLimit` | Change items per page | Reset to page 1 |
| `openDetailModal` | Open detail modal | None |
| `closeDetailModal` | Close detail modal | Clear selected ID |
| `viewSightingDetails` | Set ID and open modal | Composite action |
| `initializeRejectSighting` | Set ID and open reject modal | Composite action |

---

## API Integration

### API Functions

#### 1. **getAllSightings(params)**

Fetch paginated sightings with filters.

**Parameters:**
```typescript
{
  page?: number;
  limit?: number;
  status?: string;
  speciesId?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
}
```

**Response:**
```typescript
{
  page: number;
  limit: number;
  total: number;
  data: Sighting[];
}
```

#### 2. **approveSighting(id)**

Approve a pending sighting.

**Parameters:** `sightingId: string`

**Response:**
```typescript
{
  message: string;
  sighting: Sighting;
}
```

#### 3. **rejectSighting(id, reason)**

Reject a pending sighting with reason.

**Parameters:**
```typescript
{
  sightingId: string;
  reason: string;
}
```

**Response:**
```typescript
{
  message: string;
  sighting: Sighting;
}
```

#### 4. **deleteSighting(id)**

Permanently delete a sighting.

**Parameters:** `sightingId: string`

**Response:**
```typescript
{
  message: string;
}
```

### TanStack Query Hooks

#### **useSightings(filters)**

Fetches paginated sightings list with caching.

**Features:**
- 2-minute stale time
- Placeholder data for smooth transitions
- Automatic refetch on filter change
- Data transformation (adds pagination metadata)

**Usage:**
```typescript
const { data, isLoading, isError } = useSightings({ 
  page: 1, 
  status: 'pending' 
});
```

#### **useApproveSighting()**

Mutation hook for approving sightings.

**Features:**
- Optimistic loading toast
- Automatic cache invalidation
- Success/error notifications
- Refetch affected queries

**Usage:**
```typescript
const approve = useApproveSighting();
approve.mutate(sightingId);
```

#### **useRejectSighting()**

Mutation hook for rejecting sightings.

**Features:**
- Loading state management
- Reason parameter support
- Cache invalidation
- User notifications

**Usage:**
```typescript
const reject = useRejectSighting();
reject.mutate({ sightingId, reason });
```

---

## Key Features

### 1. **Real-time Filtering**
- Instant search across location, user, notes
- Status filter (pending, verified, rejected, all)
- Species filter
- Date range selection
- Reset all filters with one click

### 2. **Smart Pagination**
- Ellipsis for large page counts
- Configurable items per page (10, 25, 50, 100)
- Smooth transitions with placeholder data
- Current range display

### 3. **Quick Actions**
- Inline approve/reject buttons for pending sightings
- View details modal
- Delete with confirmation
- Dropdown menu for additional actions

### 4. **Detailed View**
- Photo gallery
- Complete sighting metadata
- Formatted dates and coordinates
- User information
- Quick approve/reject from modal

### 5. **Rejection Workflow**
- Required rejection reason
- Common reason templates
- Custom reason input
- User notification warning

### 6. **Loading States**
- Skeleton loaders for table
- Loading toasts during mutations
- Smooth data transitions
- Error boundaries

### 7. **Statistics Dashboard**
- Total sightings count
- Pending review count
- Verified count
- Rejected count
- Color-coded cards

### 8. **Optimistic Updates**
- Immediate UI feedback
- Background mutations
- Automatic rollback on error
- Success/error notifications

---

## Usage Guide

### For Developers

#### Adding a New Filter

1. **Add to Redux slice:**
```typescript
// sightingReviewSlice.ts
filters: {
  ...
  newFilter: '',
}

setNewFilter: (state, action) => {
  state.filters.newFilter = action.payload;
  state.pagination.page = 1;
}
```

2. **Update FilterBar component:**
```tsx
// FilterBar.tsx
<select 
  value={filters.newFilter}
  onChange={(e) => onNewFilterChange(e.target.value)}
>
  ...
</select>
```

3. **Wire up in SightingReview:**
```tsx
<FilterBar
  ...
  onNewFilterChange={(val) => dispatch(setNewFilter(val))}
/>
```

#### Adding a New Action

1. **Create API function:**
```typescript
// api/sightings.js
export const newAction = async (id, data) => {
  const headers = await getAuthHeader();
  const response = await axios.post(`${API_URL}/sightings/${id}/action`, data, { headers });
  return response.data;
};
```

2. **Create TanStack Query hook:**
```typescript
// hooks/useSightingReview.ts
export const useNewAction = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => newAction(data.id, data.payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: sightingKeys.lists() });
      toast.success('Action completed!');
    },
  });
};
```

3. **Add to component:**
```tsx
const newActionMutation = useNewAction();
const handleNewAction = (id) => newActionMutation.mutate({ id, payload });
```

### For Administrators

#### Reviewing Sightings

1. Navigate to `/admin/sightings`
2. Use filters to find specific sightings
3. Click on a row to view details
4. Approve, reject, or delete as needed

#### Approval Process

- Click green checkmark for quick approval
- Or open details modal and click "Approve"
- Sighting becomes visible to all users
- User receives notification

#### Rejection Process

- Click red X button
- Enter rejection reason (required)
- Choose from common reasons or write custom
- User receives notification with reason

#### Best Practices

- Always provide clear rejection reasons
- Review photos and metadata carefully
- Use filters to prioritize pending reviews
- Check species identification accuracy

---

## Technical Highlights

### 1. **Type Safety**
- TypeScript for all new files
- Proper interface definitions
- Type-safe Redux actions
- Generic hook types

### 2. **Performance**
- React Query caching (2-minute stale time)
- Placeholder data for smooth transitions
- Memoized query parameters
- Optimized re-renders

### 3. **Error Handling**
- Try-catch in API calls
- Error states in queries
- User-friendly error messages
- Rollback on mutation failure

### 4. **Accessibility**
- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Focus management in modals

### 5. **Responsive Design**
- Mobile-first approach
- Grid layouts with breakpoints
- Touch-friendly buttons
- Scrollable tables

### 6. **Code Quality**
- Modular components
- Single responsibility principle
- Reusable utilities
- Consistent naming conventions

---

## Future Enhancements

### Potential Features

1. **Bulk Operations**
   - Select multiple sightings
   - Batch approve/reject
   - Bulk export

2. **Advanced Filtering**
   - Location radius filter
   - User-based filtering
   - Photo quality filter

3. **Activity Log**
   - Track admin actions
   - Audit trail
   - Undo functionality

4. **Email Notifications**
   - Auto-notify users on approval/rejection
   - Customizable templates
   - Email preferences

5. **Map Integration**
   - View sightings on map
   - Cluster nearby sightings
   - Spatial filtering

6. **Analytics**
   - Approval rate metrics
   - Time to review stats
   - User submission patterns

7. **Comments System**
   - Admin notes on sightings
   - Internal discussion
   - Reviewer collaboration

---

## Dependencies

### Required Packages

```json
{
  "@reduxjs/toolkit": "^2.x",
  "@tanstack/react-query": "^5.x",
  "react-redux": "^9.x",
  "redux-persist": "^6.x",
  "axios": "^1.x",
  "date-fns": "^3.x",
  "lucide-react": "^0.x",
  "sonner": "^1.x"
}
```

### Peer Dependencies

```json
{
  "react": "^18.x",
  "react-dom": "^18.x",
  "react-router-dom": "^6.x"
}
```

---

## Conclusion

The Sighting Review feature is a production-ready, enterprise-grade admin module that demonstrates best practices in modern React development. It combines Redux for UI state, TanStack Query for server state, modular components, and a clean architecture that's easy to maintain and extend.

For questions or contributions, please refer to the main project documentation.
