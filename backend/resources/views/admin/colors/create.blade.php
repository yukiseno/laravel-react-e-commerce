@extends('admin.layouts.app')

@section('title')
    Add new color
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div>
                        <h3 class="mt-2">Add Color</h3>
                        <hr>
                    </div>
                    <div class="card-body">
                        <form action="{{ route('admin.colors.store') }}" method="post">
                            @csrf
                            <div class="form-floating mb-3">
                                <input type="text" class="form-control @error('name') is-invalid @enderror"
                                    id="floatingInput" name="name" placeholder="Name" value="{{ old('name') }}">
                                <label for="floatingInput">Name*</label>
                                @error('name')
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
