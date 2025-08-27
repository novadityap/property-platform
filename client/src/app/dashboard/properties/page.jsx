'use client';

import DataTable from '@/components/ui/DataTable';
import { createColumnHelper } from '@tanstack/react-table';
import {
  useSearchPropertiesQuery,
  useLazyShowPropertyQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useRemovePropertyMutation,
  useUploadPropertyImageMutation,
  useRemovePropertyImageMutation,
} from '@/services/propertyApi.js';
import PropertyForm from '@/components/ui/PropertyForm.jsx';
import { Badge } from '@/components/shadcn/badge';
import BreadcrumbNav from '@/components/ui/BreadcrumbNav';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/shadcn/card';
import AuthGuard from '@/components/auth/AuthGuard';
import Image from 'next/image';

const Property = () => {
  const columnsHelper = createColumnHelper();
  const columns = [
    columnsHelper.accessor('images', {
      id: 'images',
      enableSorting: false,
      header: 'Image',
      size: 150,
      cell: info => {
        const images = info.getValue();
        if (!images || images.length === 0) return null;

        return (
          <div className="flex flex-wrap gap-1">
            {images.slice(0, 5).map((img, index) => (
              <Image
                width={60}
                height={40}
                key={index}
                src={img}
                alt={`image-${index}`}
                className="object-cover rounded"
              />
            ))}
          </div>
        );
      },
    }),
    columnsHelper.accessor('name', {
      id: 'name',
      header: 'Name',
      size: 200,
      cell: info => (
        <div className="whitespace-normal break-words">{info.getValue()}</div>
      ),
    }),
    columnsHelper.accessor('description', {
      id: 'description',
      header: 'Description',
      size: 200,
      cell: info => (
        <div className="whitespace-normal break-words">{info.getValue()}</div>
      ),
    }),
    columnsHelper.accessor('address', {
      id: 'address',
      header: 'Address',
      size: 200,
      cell: info => (
        <div className="whitespace-normal break-words">{info.getValue()}</div>
      ),
    }),
    columnsHelper.accessor('regularPrice', {
      id: 'price',
      header: 'Price',
      size: 150,
    }),
    columnsHelper.accessor('discountPrice', {
      id: 'discount',
      header: 'Discount',
      size: 150,
    }),
    columnsHelper.accessor('offer', {
      id: 'offer',
      header: 'Offer',
      size: 60,
      cell: info => {
        const offer = info.getValue();
        if (offer === true) return <Badge variant="default">Yes</Badge>;
        if (offer === false) return <Badge variant="destructive">No</Badge>;
      },
    }),
    columnsHelper.accessor('bedroom', {
      id: 'bedroom',
      header: 'Bedroom',
      size: 100,
    }),
    columnsHelper.accessor('bathroom', {
      id: 'bathroom',
      header: 'Bathroom',
      size: 100,
    }),
    columnsHelper.accessor('parking', {
      id: 'parking',
      header: 'Parking',
      size: 100,
      cell: info => {
        const parking = info.getValue();
        if (parking === true) return <Badge variant="default">Yes</Badge>;
        if (parking === false) return <Badge variant="destructive">No</Badge>;
      },
    }),
    columnsHelper.accessor('furnished', {
      id: 'furnished',
      header: 'Furnished',
      size: 120,
      cell: info => {
        const furnished = info.getValue();
        if (furnished === true) return <Badge variant="default">Yes</Badge>;
        if (furnished === false) return <Badge variant="destructive">No</Badge>;
      },
    }),
    columnsHelper.accessor('type', {
      id: 'type',
      header: 'Type',
      size: 100,
    }),
  ];

  return (
    <AuthGuard requiredRoles={['admin', 'user']}>
      <BreadcrumbNav />
      <Card>
        <CardHeader>
          <CardTitle className="text-gray-800">Properties</CardTitle>
          <CardDescription>Manage properties</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            columns={columns}
            searchQuery={useSearchPropertiesQuery}
            removeMutation={useRemovePropertyMutation}
            FormComponent={PropertyForm}
            entityName="property"
          />
        </CardContent>
      </Card>
    </AuthGuard>
  );
};

export default Property;
