<div class="sidebar border border-right col-md-3 col-lg-2 p-0 bg-body-tertiary">
    <div class="offcanvas-md offcanvas-end bg-body-tertiary" tabindex="-1" id="sidebarMenu"
        aria-labelledby="sidebarMenuLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="sidebarMenuLabel">Product Selling</h5> <button type="button" class="btn-close"
                data-bs-dismiss="offcanvas" data-bs-target="#sidebarMenu" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body d-md-flex flex-column p-0 pt-lg-3 overflow-y-auto">
            <ul class="nav flex-column">
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page"
                        href="{{ route('admin.index') }}">
                        <i class="bi bi-speedometer2"></i>Dashboard
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page"
                        href="{{ route('admin.colors.index') }}">
                        <i class="bi bi-palette"></i>Color
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page"
                        href="{{ route('admin.sizes.index') }}">
                        <i class="bi bi-ui-checks-grid"></i>Size
                    </a>
                </li>
                <li class="nav-item">
                    <a class="nav-link d-flex align-items-center gap-2" aria-current="page"
                        href="{{ route('admin.coupons.index') }}">
                        <i class="bi bi-ticket-detailed"></i>Coupon
                    </a>
                </li>
            </ul>
            <hr class="my-3">
            <ul class="nav flex-column mb-auto">
                <li class="nav-item">
                    <form id="AdminLogoutForm" action="{{ route('admin.logout') }}" method="post">
                        @csrf
                        <button type="submit" class="nav-link d-flex align-items-center gap-2">
                            <i class="bi bi-box-arrow-right"></i>
                            Log out
                        </button>
                    </form>

                </li>
            </ul>
        </div>
    </div>
</div>
