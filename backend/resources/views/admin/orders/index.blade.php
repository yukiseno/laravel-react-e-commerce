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
                        <h3 class="mt-2">Orders ({{ $orders->count() }})</h3>
                        <a href="{{ route('admin.products.create') }}" class="btn btn-sm btn-primary">
                            <i class="bi bi-plus"></i>
                        </a>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table paging-table">
                            <thead>
                                <tr>
                                    <th scope="col">Order</th>
                                    <th scope="col">Customer</th>
                                    <th scope="col">Total ($)</th>
                                    <th scope="col">Coupon</th>
                                    <th scope="col">By</th>
                                    <th scope="col">Date</th>
                                    <th scope="col">Delivered</th>
                                    <th scope="col" class="text-end">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($orders as $index => $order)
                                    <tr>
                                        <td>
                                            <strong>#{{ $order->id }}</strong><br>
                                            <small class="text-muted">
                                                {{ $order->items->count() }} item(s)
                                            </small>
                                        </td>

                                        <td>
                                            {{ $order->user->name }}
                                        </td>

                                        <td>
                                            ${{ number_format($order->total / 100, 2) }}

                                            @if ($order->discount_total > 0)
                                                <br>
                                                <small class="text-success">
                                                    −${{ number_format($order->discount_total / 100, 2) }}
                                                </small>
                                            @endif
                                        </td>

                                        <td>
                                            @if ($order->coupon)
                                                <span class="badge bg-success">{{ $order->coupon->name }}</span>
                                            @else
                                                <span class="badge bg-secondary">N/A</span>
                                            @endif
                                        </td>

                                        <td>
                                            {{ $order->user->name }}
                                        </td>

                                        <td>
                                            {{ $order->created_at->format('Y-m-d') }}
                                        </td>

                                        <td>
                                            @if ($order->delivered_at)
                                                <span class="badge bg-success">
                                                    Delivered {{ $order->delivered_at->diffForHumans() }}
                                                </span>
                                            @else
                                                <span class="badge bg-warning">
                                                    Pending
                                                </span>
                                                <br>
                                                <form action="{{ route('admin.orders.update', $order) }}" method="POST"
                                                    class="d-inline"
                                                    onsubmit="return confirm('Mark this order as delivered?');">
                                                    @csrf
                                                    @method('PATCH')
                                                    <button class="btn btn-sm btn-success">
                                                        Mark Delivered
                                                    </button>
                                                </form>
                                            @endif
                                        </td>

                                        <td class="text-end">
                                            <a href="{{ route('admin.orders.show', $order) }}"
                                                class="btn btn-sm btn-primary">
                                                View
                                            </a>

                                            <form action="{{ route('admin.orders.delete', $order) }}" method="POST"
                                                class="d-inline" onsubmit="return confirm('Delete this order?');">
                                                @csrf
                                                @method('DELETE')
                                                <button class="btn btn-sm btn-danger">
                                                    Delete
                                                </button>
                                            </form>
                                        </td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
