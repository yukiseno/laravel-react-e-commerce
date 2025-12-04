@extends('admin.layouts.app')

@section('title')
    Add new coupon
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div>
                        <h3 class="mt-2">Add Coupon</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.coupons.store') }}" method="post">
                            @csrf
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control @error('name') is-invalid @enderror" id="name"
                                    name="name" placeholder="Name" value="{{ old('name') }}">
                                <label for="name">Name*</label>
                                @error('name')
                                    <span class="invalid-feedback">
                                        <strong>{{ $message }}</strong>
                                    </span>
                                @enderror
                            </div>
                            <div class="form-floating mb-3">
                                <input type="number" class="form-control @error('discount') is-invalid @enderror"
                                    id="discount" name="discount" placeholder="Discount" value="{{ old('discount') }}">
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
                                    min="{{ \Carbon\Carbon::now()->addDays(1) }}"
                                    value="{{ \Carbon\Carbon::now()->format('Y-m-d\Th:i:s') }}">
                                <label for="discount">Validity*</label>
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
