@extends('admin.layouts.app')

@section('title')
    Edit coupons
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div>
                        <h3 class="mt-2">Edit Coupon</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.coupons.update', $coupon->id) }}" method="post">
                            @csrf
                            @method('PUT')
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                                    name="name" placeholder="Name" value="{{ old('name', $coupon->name) }}">
                                <label for="floatingInput">Name*</label>
                                @error('name')
                                    <span class="invalid-feedback">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="form-floating mb-3">
                                <input type="number" class="form-control @error('discount') is-invalid @enderror"
                                    id="discount" name="discount" placeholder="Discount"
                                    value="{{ old('discount', $coupon->discount) }}">
                                <label for="discount">Discount*</label>
                                @error('discount')
                                    <span class="invalid-feedback">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="form-floating mb-3">
                                <input type="datetime-local" class="form-control @error('valid_until') is-invalid @enderror"
                                    id="valid_until" name="valid_until" placeholder="Validity"
                                    value="{{ $coupon->valid_until }}">
                                <label for="valid_until">Validity*</label>
                                @error('valid_until')
                                    <span class="invalid-feedback">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="mb-2">
                                <button type="submit" class="btn btn-sm btn-dark">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    </div>
@endsection
