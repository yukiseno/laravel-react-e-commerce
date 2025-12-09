@extends('admin.layouts.app')

@section('title')
    products
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Order Items </h3>
                        <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
                            <i class="bi bi-plus"></i>
                        </a>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table table-sm paging-table">
                            <thead>
                                <tr>
                                    <th>Product</th>
                                    <th>Variant</th>
                                    <th>Qty</th>
                                    <th>Price</th>
                                    <th>Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($order->items as $item)
                                    <tr>
                                        <td>{{ $item->product_name }}</td>
                                        <td>
                                            {{ $item->color_name }} / {{ $item->size_name }}
                                        </td>
                                        <td>{{ $item->qty }}</td>
                                        <td>{{ number_format($item->price / 100, 2) }}</td>
                                        <td>{{ number_format($item->subtotal / 100, 2) }}</td>
                                    </tr>
                                @endforeach
                            </tbody>
                            <div class="d-flex justify-content-end mt-4">
                                <table class="table table-sm w-50">
                                    <tr>
                                        <th>Subtotal</th>
                                        <td class="text-end">
                                            ${{ number_format($order->subtotal / 100, 2) }}
                                        </td>
                                    </tr>

                                    @if ($order->discount_total > 0)
                                        <tr>
                                            <th>Discount</th>
                                            <td class="text-end text-success">
                                                −${{ number_format($order->discount_total / 100, 2) }}
                                            </td>
                                        </tr>
                                    @endif

                                    <tr class="fw-bold border-top">
                                        <th>Total</th>
                                        <td class="text-end">
                                            ${{ number_format($order->total / 100, 2) }}
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
