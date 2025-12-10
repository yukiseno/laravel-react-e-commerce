@extends('admin.layouts.app')

@section('title')
    coupons
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Coupons ({{ $coupons->count() }})</h3>
                        <a href="{{ route('admin.coupons.create') }}" class="btn btn-sm btn-primary">
                            <i class="bi bi-plus"></i>
                        </a>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table paging-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Discount</th>
                                    <th scope="col">Validity</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($coupons as $key => $coupon)
                                    <tr>
                                        <th scope="row">{{ $key += 1 }}</th>
                                        <td>{{ $coupon->name }}</td>
                                        <td>{{ $coupon->discount }}</td>
                                        <td>
                                            @if ($coupon->checkIfValid())
                                                <span class="bg-success border border-dark p-1 text-white">
                                                    Valid until
                                                    {{ \Carbon\Carbon::parse($coupon->valid_until)->diffForHumans() }}
                                                </span>
                                            @else
                                                <span class="bg-danger border border-dark p-1 text-white">
                                                    Expired
                                                </span>
                                            @endif
                                        </td>
                                        <td class="d-flex gap-1">
                                            <a href="{{ route('admin.coupons.edit', $coupon->id) }}"
                                                class="btn btn-sm btn-warning">
                                                <i class="bi bi-pencil-square"></i>
                                            </a>
                                            <button onclick="deleteItem({{ $coupon->id }})" class="btn btn-sm btn-danger">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <form id="{{ $coupon->id }}"
                                                action="{{ route('admin.coupons.destroy', $coupon->id) }}" method="post">
                                                @csrf
                                                @method('DELETE')
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
