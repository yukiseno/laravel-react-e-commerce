@extends('admin.layouts.app')

@section('title')
    Users
@endsection

@section('content')
    <div class="row">
        @include('admin.layouts.sidebar')
        <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
            <div class="row mt-2">
                <div class="col-md-12">
                    <div class="card-header bg-white d-flex justify-content-between align-items-center">
                        <h3 class="mt-2">Users ({{ $users->count() }})</h3>
                    </div>
                    <hr>
                    <div class="card-body">
                        <table class="table paging-table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Registered</th>
                                    <th scope="col"></th>
                                </tr>
                            </thead>
                            <tbody>
                                @foreach ($users as $key => $user)
                                    <tr>
                                        <td scope="col">{{ $key += 1 }}</td>
                                        <td scope="col">{{ $user->name }}</td>
                                        <td scope="col">{{ $user->email }}</td>
                                        <td scope="col">{{ $user->created_at->diffForHumans() }}</td>
                                        <td>
                                            <form action="{{ route('admin.users.delete', $user->id) }}" method="POST"
                                                onsubmit="return confirm('Are you sure you want to delete this user?')"
                                                class="d-inline">
                                                @csrf
                                                @method('DELETE')

                                                <button type="submit" class="btn btn-sm btn-danger">
                                                    <i class="bi bi-trash"></i>
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
