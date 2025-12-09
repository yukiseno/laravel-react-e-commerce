@extends('admin.layouts.app')

@section('title')
    colors
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Colors ({{ $colors->count() }})</h3>
                        <a href="{{ route('admin.colors.create') }}" class="btn btn-sm btn-primary">
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
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($colors as $key => $color)
                                    <tr>
                                        <th scope="row">{{ $key += 1 }}</th>
                                        <td>{{ $color->name }}</td>
                                        <td>
                                            <a href="{{ route('admin.colors.edit', $color->id) }}"
                                                class="btn btn-sm btn-warning">
                                                <i class="bi bi-pencil-square"></i>
                                            </a>
                                            <button onclick="deleteItem({{ $color->id }})" class="btn btn-sm btn-danger">
                                                <i class="bi bi-trash"></i>
                                            </button>
                                            <form id="{{ $color->id }}"
                                                action="{{ route('admin.colors.destroy', $color->id) }}" method="post">
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
